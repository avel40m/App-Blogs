import { useEffect, useState } from "react";
import Post from "../Component/Post";

export default function IndexPages(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/post',{method: 'GET'})
            .then(response => response.json()
                .then(post => {
                    setPosts(post)})
            );
    },[]);
    return(
        <>
        {
            posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            )) 
        }
        </>
    )
}