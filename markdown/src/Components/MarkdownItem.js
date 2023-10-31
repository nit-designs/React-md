export default function MarkdownItem({item, onItemSelected}) {
    return (
        <div className={item.selected === true ? 'markdown-item selected' : 'markdown-item'} 
            onClick={ () =>  onItemSelected(item) }>
            { item.content }
        </div>
    )
};