import { format } from 'date-fns';
export default function Post({title,summary,cover,content,createdAt,author}){
    return (
    <div className="post">
        <div className="image">
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </div>
        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a href="" className="author">{author.username}</a>
            <span className="timer">{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</span>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>     
    )
}