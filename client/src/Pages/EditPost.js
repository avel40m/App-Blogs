import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFile] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json().then(info => {
                setTitle(info.title);
                setSummary(info.summary);
                setContent(info.content);
            }))
    },[])

    async function editNewPost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if (file?.[0]) {
            data.set('file',file?.[0]);
        }
        const response = await fetch('http://localhost:4000/post',{method: 'PUT',body: data,credentials: 'include'});
        
        if(response.ok){
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }
    return (
        <form onSubmit={e => editNewPost(e)}>
            <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="summary" value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" onChange={e => setFile(e.target.files)} />
            <Editor onChange={setContent} value={content}/>
            <button style={{marginTop:'5px'}}>Update Post</button>
        </form>
    )
}