export function useValidation() {
    type EntityWithId = {
        name: string
    }

    const kana = (value: string) => {
        if (value.match(/^[あ-ん]$/)) return true;
        else return false;
    }

    const id = (value: string) => {
        if (value.match(/^\d+$/)) return true;
        else return false;
    }

    const text = (value: string) => {
        if (value.match(/^[a-zA-Z0-9ぁ-んァ-ン一-龠々]+$/)) return true;
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
        id,
        kana,
        text,
        blank,
        nameInList,
        url
    }
}