import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

export default function MarkdownEditor({ selectedItem, onContentChanged }) {
    const onChange = (content) => {
        const changedMarkdown = {...selectedItem, content};
        onContentChanged(changedMarkdown);
    };

    return (
        <>
            <div className="editor">
                <textarea className="markdown-editor" 
                    value={ selectedItem.content } 
                    onChange={ (e) => onChange(e.target.value) } />
            </div>
            <div className='viewer'>
                <ReactMarkdown
                    children={ selectedItem.content }
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    ></ReactMarkdown>
            </div>
        </>
    );
};