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

const Conf = {
    CategoryType,
    getCategoryKeyFromId,
    getCategoryIdFromKey,
    getCategoryKeys,
    kana
}

export { Conf };