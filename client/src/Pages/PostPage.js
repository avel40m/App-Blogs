import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PostPage(){
    const {id} = useParams();
    console.log(id);
    const [postInfo,setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then( response => response.json()
                .then( info => {
                    setPostInfo(info)
                }))
    },[]);

    if(!postInfo) return '';

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <span className="timer">{format(new Date(postInfo.createdAt),'MMM d, yyyy HH:mm')}</span>
            <div className="author">by {postInfo.author.username}</div>
            <div className="image">
                <img src={'http://localhost:4000/'+postInfo.cover} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: postInfo.content}}></div>
        </div>
    )
}