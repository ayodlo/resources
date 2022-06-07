import react from 'react';

interface SearchResultsListProps {
    items: any[]
}
const SearchResultsList = ({items}: SearchResultsListProps) => {
const list = items.map((element) => {
    return <li><a>{element.name}</a></li>
})

if(items.length <= 0) {
    return <p>No items to display!</p>
}
return (
    <ul>
    {list}
    </ul>
)
}

export default SearchResultsList;