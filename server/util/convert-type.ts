export function convertType(value: string): any {
    // 数値かチェック
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
        return numberValue;
    }

    // 真偽値かチェック
    if (value.toLowerCase() === 'true') {
        return true;
    } else if (value.toLowerCase() === 'false') {
        return false;
    }

    // 該当しない場合、そのまま(文字列として)返す
    return value;
}