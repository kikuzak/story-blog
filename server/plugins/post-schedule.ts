import cron from 'node-cron';
import axios from 'axios';
import { prisma } from '../util/prisma-client';
import { Conf } from '~/composables/conf';
import { KanaLineLogic } from '~/composables/kana-line';
import { RegionLogic } from '~/composables/region';
import { CountryLogic } from '~/composables/country';
import { PrefectureLogic } from '~/composables/prefecture';
import { PeriodLogic } from '~/composables/period';

const url = "https://discord.com/api/webhooks/1195657086277783583/QRKMf4Jm5BAZaG_3X1xJXkTQ0pOUU7O5kC3DU00dfNQLVkBvtxrnV7IGT6Mm1gNh6ve-";

const headers = {
    'Content-Type': 'application/json'
};

export default defineNitroPlugin(async (nitroApp) => {
    cron.schedule('30 * * * *', async () => {
        try {
            // データの取得
            const reservedArticles = await prisma.article.findMany({
                where: {
                    status: 1
                }
            });

            let updateArticles = [];
            let description = "";
            for (let i = 0; i < reservedArticles.length; i++) {
                const date = reservedArticles[i].published_at as Date
                const now = new Date();
                if (date < new Date()) {
                    reservedArticles[i].status = 2;
                    reservedArticles[i].updated_at = now;
                    updateArticles.push(reservedArticles[i]);
                    description += reservedArticles[i].title + "\n";

                    await prisma.article.update({
                        where: {
                            id: reservedArticles[i].id
                        },
                        data: reservedArticles[i]
                    });
                    // 登録済み処理
                    // 索引
                    let line = await KanaLineLogic.getByName(Conf.getLineByKana(reservedArticles[i].kana) as string);
                    if (line.value && !line.value.is_posted) {
                        line.value.is_posted = true;
                        await KanaLineLogic.update(line.value);
                    }
                    // 地域
                    let region = await RegionLogic.getById(reservedArticles[i].region_id as number);
                    if (region.value && !region.value.is_posted) {
                        region.value.is_posted = true;
                        await RegionLogic.update(region.value);
                    }
                    // 国
                    let country = await CountryLogic.getById(reservedArticles[i].country_id as number);
                    if (country.value && !country.value.is_posted) {
                        country.value.is_posted = true;
                        await CountryLogic.update(country.value);
                    }
                    // 県
                    let prefecture = await PrefectureLogic.getById(reservedArticles[i].prefecture_id as number);
                    if (prefecture.value && !prefecture.value.is_posted) {
                        prefecture.value.is_posted = true;
                        await PrefectureLogic.update(prefecture.value);
                    }
                    // 時代
                    let period = await PeriodLogic.getById(reservedArticles[i].period_id as number);
                    if (period.value && !period.value.is_posted) {
                        period.value.is_posted = true;
                        await PeriodLogic.update(period.value);
                    }
                }
            }

            if (updateArticles.length === 0) return;

            const data = {
                embeds: [
                    {
                        title: "記事の投稿が完了しました！",
                        color: parseInt("55c500", 16),
                        description: description
                    }

                ]
            };

            axios.post(url, data, {
                headers: headers
            });

        } catch (e) {
            console.log(e);
            const data = {
                embeds: [
                    {
                        title: "記事の投稿に失敗しました･･･",
                        color: parseInt("fa113d", 16),
                        description: e
                    }
                ]
            }
            axios.post(url, data, {
                headers: headers
            });
        }
    })
});
