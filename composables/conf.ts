const CategoryType: { [key: string]: number } = {
    folklore: 1,
    myth: 2,
    legend: 3,
    others: 4,
    writer: 5
}
type CategoryType = typeof CategoryType[keyof typeof CategoryType];

const getCategoryKeyFromId = (id: number): string | null => {
    const key = Object.keys(CategoryType).find(key => CategoryType[key] === id);
    if (key) return key;
    else return null;
}

const getCategoryIdFromKey = (key: string): number | null => {
    const id = CategoryType[key];
    if (id) return id;
    else return null;
}

const getCategoryKeys= (): string[] => {
    let res: string[] = [];
    Object.keys(CategoryType).forEach(key => {
        res.push(key);
    });
    return res;
}

const kana = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', ];
const getLineByKana = (kana: string): string | null => {
    if (kana.match(/[あ-お]/)) return 'あ';
    else if (kana.match(/[か-こ]/)) return 'か';
    else if (kana.match(/[さ-そ]/)) return 'さ';
    else if (kana.match(/[た-と]/)) return 'た';
    else if (kana.match(/[な-の]/)) return 'な';
    else if (kana.match(/[は-ほ]/)) return 'は';
    else if (kana.match(/[ま-も]/)) return 'ま';
    else if (kana.match(/[や-よ]/)) return 'や';
    else if (kana.match(/[ら-ろ]/)) return 'ら';
    else if (kana.match(/[わ-ん]/)) return 'わ';
    else return null
}

const Conf = {
    CategoryType,
    getCategoryKeyFromId,
    getCategoryIdFromKey,
    getCategoryKeys,
    kana,
    getLineByKana
}

export { Conf };