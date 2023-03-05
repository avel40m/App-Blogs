import { format } from 'date-fns';
import { Link } from 'react-router-dom';
export default function Post({_id,title,summary,cover,content,createdAt,author}){
    return (
    <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:4000/${cover}`} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <p href="" className="author">{author.username}</p>
            <span className="timer">{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</span>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>     
    )
}