import fs from 'fs';
import path from 'path';

function findVueFiles(directory) {
    const vueFiles = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });

    files.forEach((file) => {
        const filePath = path.join(directory, file.name);
        if (file.isDirectory()) {
        vueFiles.push(...findVueFiles(filePath));
        } else if (file.isFile() && filePath.endsWith('.vue')) {
        vueFiles.push(filePath);
        }
    });

    return vueFiles;
}

function findStyleTags(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const styleRegex = /<style.*?>([\s\S]*?)<\/style>/gi;
        const matches = fileContent.match(styleRegex);

        if (matches) {
        const styleTags = matches.map((match) => {
            const styleContent = match.replace(/<style.*?>/i, '').replace(/<\/style>/i, '');
            return styleContent;
        });

        console.log(`Style tags found in ${filePath}:`, styleTags);
        return styleTags;
        }
        return [];
    } catch (error) {
        console.error('Error occurred while finding style tags:', error);
        return [];
    }
}

function reorderStyles(filePath, order) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const styleRegex = /<style.*?>([\s\S]*?)<\/style>/gi;
        const matches = fileContent.match(styleRegex);

        if (matches) {
            const updatedContent = matches.map((match) => {
                const styleContent = match.replace(/<style.*?>/i, '').replace(/<\/style>/i, '');
                const lines = styleContent.split('\n');
    
                const reorderedLines = lines.map((line) => {
                    const property = line.trim().split(':')[0].trim();
                    const index = order.indexOf(property);
        
                    if (index !== -1) {
                        return line;
                    }
                    return null;
                }).filter(Boolean);

                return reorderedLines.join('\n');
            });

            console.log(`Styles reordered in ${filePath}:`, updatedContent);
            return updatedContent;
        }
        return [];
    } catch (error) {
        console.error('Error occurred while reordering styles:', error);
        return [];
    }
}

const directoriesToSearch = [
    path.resolve('pages'),      // ページコンポーネントのディレクトリ
    path.resolve('components'), // コンポーネントのディレクトリ
    path.resolve('layouts')     // レイアウトのディレクトリ
    // 他のディレクトリを追加できます
];

const allVueFiles = [];

directoriesToSearch.forEach((directory) => {
    const vueFiles = findVueFiles(directory);
    allVueFiles.push(...vueFiles);
});

  // プロパティの順序を指定したJSONファイルを読み込む
const __filename = new URL(import.meta.url).pathname;
const orderFilePath = './util/property_order.json';
const order = JSON.parse(fs.readFileSync(orderFilePath, 'utf-8'));

allVueFiles.forEach((file) => {
    reorderStyles(file, order);
});