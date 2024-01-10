export function usePager(numPerPage: number, count: number) {
    const totalCount = count
    const currentPage = ref(1);
    const numberPerPage = ref(numPerPage); // 1ページあたりの表示件数
    const currentNumPerPage = ref(numPerPage); // 現在のページに表示されている件数

    /** ページが何件目のデータからはじまるか */
    const pageStartNum = () => {
        return (currentPage.value - 1) * numberPerPage.value + 1;
    }

    /** ページが何件目のデータで終わるか */
    const pageEndNum = () => {
        return (currentPage.value - 1) * numberPerPage.value + currentNumPerPage.value;
    }

    /** 最終ページが何ページ目か */
    const lastPage = Math.ceil(totalCount / numberPerPage.value);
    
    const next = () => {
        currentPage.value = currentPage.value + 1
        if (currentPage.value < 1) currentPage.value = 1;
        let count = totalCount - (currentPage.value - 1) * numberPerPage.value;
        if (count > numberPerPage.value) count = numberPerPage.value;
        currentNumPerPage.value = count;

    };

    const previous = () => {
        currentPage.value = currentPage.value - 1
        if (currentPage.value < 1) currentPage.value = 1;
        let count = totalCount - (currentPage.value - 1) * numberPerPage.value;
        if (count > numberPerPage.value) count = numberPerPage.value;
        currentNumPerPage.value = count;
    }

    const isFirstPage = () => {
        if (currentPage.value === 1) return true;
        else return false;
    }

    const isLastPage = () => {
        if (currentPage.value === lastPage) return true;
        else return false;
    }

    /** ページあたりの表示件数を変更する */
    const changeNumberPerPage = (num: number) => {
        numberPerPage.value = num;
    }

    return {
        currentPage,
        numberPerPage,
        currentNumPerPage,
        lastPage,
        pageStartNum,
        pageEndNum,
        next,
        previous,
        isFirstPage,
        isLastPage,
        changeNumberPerPage
    }
}