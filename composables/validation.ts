export function useValidation() {
    type EntityWithId = {
        name: string
    }

    const kana = (value: string) => {
        if (value.match(/^[あ-ん]$/)) return true;
        else return false;
    }

    const blank = (value: string) => {
        if (value) return true;
        else return false;
    }

    const nameInList = <T extends EntityWithId>(name: string, list: T[]) => {
        const index = list.findIndex((v) => v.name === name);
        if (index < 0) return false;
        else return true;
    }

    const url = (value: string) => {
        if (value.match(/^(https?|http):\/\/.*$/)) return true;
        else return false;
    }

    return {
        kana,
        blank,
        nameInList,
        url
    }
}