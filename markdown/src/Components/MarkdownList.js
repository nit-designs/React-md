import MarkdownItem from "./MarkdownItem";

export default function MarkdownList({list, onItemSelected}) {    
    return (
        <div className="list-container">            
            {
                list.length && list.map(item => {
                    return <MarkdownItem key={item._id}
                                         item={item} 
                                         onItemSelected={ onItemSelected }></MarkdownItem>
                })
            }
        </div>
    );
};