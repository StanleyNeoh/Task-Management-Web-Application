export function handleSort(e, sortState, setSortState){
    const key = e.target.attributes.associated.value
    const query = e.target.attributes.query.value
    if(sortState.key == key){
        setSortState({
            key: key, 
            ascending: !sortState.ascending, 
            order: !sortState.ascending ? `${query}` : `${query} DESC`
        });
    } else {
        setSortState({
            key: key, 
            ascending: true, 
            order: `${query}`
        });
    }
}

export function handleSearch(e, setSearch){
    e.preventDefault();
    setSearch(e.target[0].value);
}