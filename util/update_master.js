import fs from 'fs';
import { PrismaClient } from "@prisma/client";

const MASTER_CSV_PATH = "./prisma/master/";

async function main() {
    const args = process.argv.splice(2, process.argv.length - 1);
    if (args[0] == "all") {
        await updateMasterAll();
        return;
    }

    for (let i = 0; i < args.length; i++) {
        const tableName = args[i];
        const tableData = await parseCSV(tableName);
        await updateMaster(tableName, tableData);
    }
}

async function parseCSV(fileName) {
    const filePath = `${MASTER_CSV_PATH}${fileName}.csv`;
    return new Promise((resolve) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(`fail to load ${MASTER_CSV_PATH}${fileName}.csv`);
                return;
            }
    
            let rows = data.split(/\r?\n/).map(row => row.split(/,/));
            let keys = rows.splice(0, 1)[0];
            let result = [];
    
            for (let i = 0; i < rows.length; i++) {
                let resItem ={};

                for (let j = 0; j < keys.length; j++) {
                    let value = rows[i][j];
                    // 型チェック
                    if (!isNaN(Number(value))) value = Number(value);
                    else if (value === "TRUE") value = true;
                    else if (value === "FALSE") value = false;
                    else if (!String(value)) value = undefined;
                    resItem[keys[j]] = value;
                }
                result.push(resItem);
            }
            resolve(result);
        });
    });
}

async function updateMaster(tableName, tableData) {
    const prisma = new PrismaClient();
    try {
        await prisma[tableName].deleteMany();
        await prisma[tableName].createMany({
            data: tableData,
        });
        console.log(`table: ${tableName} is updated.`);
    } catch(error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

async function updateMasterAll() {
    let fileNames = await fs.readdirSync(MASTER_CSV_PATH, (err, files) => {
        return files;
    });

    for (let i = 0; i < fileNames.length; i++) {
        const tableName = fileNames[i].replace(/^(.+)\..+$/, '$1');
        const tableData = await parseCSV(tableName);
        await updateMaster(tableName, tableData);
    }
}

await main();