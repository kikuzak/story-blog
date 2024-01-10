export default function pageNumCount(name: string): Ref<number> {
    const { data, error } = useFetch(`/api/count`, {
        query: {name: name}
    });
    if (error.value) throw(error.value);
    return data as Ref<number>;
}