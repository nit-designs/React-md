import Header from './Header';
import MarkdownList from './MarkdownList';
import MarkdownEditor from './MarkdownEditor';
import { listMarkdowns, createMarkdown, updateMarkdown, deleteMarkdown } from '../Services/MarkdownService';
import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function Root() {
    const [markdownList, setMarkdownList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const onItemSelected = useCallback((data) => {
        data.selected = true;
        setSelectedItem(data);
      
        if (markdownList && markdownList.length) {
          const updatedData = [...markdownList].map((item) => {
            item.selected = item._id === data._id;
            return item;
          });
          setMarkdownList(updatedData);
        }
      }, [setSelectedItem, setMarkdownList]);
      
    const onAddNew = () => {
        setSelectedItem({ content: ''});
    };

    const getAllMarkdowns = useCallback(() => {
        listMarkdowns((data) => {            
            setMarkdownList(data); 
            if(data && data.length) {
                onItemSelected(data[0]);
            }
        });
    },[]);

    const onSave = () => {
        if(selectedItem._id) {
           
            updateMarkdown(selectedItem._id, selectedItem.content, (data) => {                
                getAllMarkdowns();
            })
        }
        else {
       
            createMarkdown(selectedItem.content, (data) => {                
                getAllMarkdowns();
            })
        }
    };

    const onDelete = () => {
        deleteMarkdown(selectedItem._id, () => {
            getAllMarkdowns();
        });
    };

    useEffect(() => {
        getAllMarkdowns();
    }, [getAllMarkdowns]);    

    
    return (        
        <div className="layout">
            <Header></Header>
            { markdownList && markdownList.length &&
                <div className="second-row">
                    <MarkdownList list={[...markdownList]} onItemSelected={ onItemSelected }></MarkdownList>
                    <MarkdownEditor selectedItem = {selectedItem} onContentChanged={ (data) => setSelectedItem(data)}></MarkdownEditor>
                </div>                
            }
            <div className="footer">
                <Button variant="success" style={{borderRadius: 0}} onClick={ onAddNew }>
                    Add new
                </Button>&nbsp;
                <Button variant="success" style={{borderRadius: 0}} onClick={ onSave}>
                    Save
                </Button>&nbsp;
                <Button variant="danger" style={{borderRadius: 0}} onClick={ onDelete }>
                    Delete
                </Button>
            </div>
        </div>
    )
};
