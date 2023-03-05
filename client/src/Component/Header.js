import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


export default function Header(){
  const { setUserInfo,userInfo } = useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  },[]);

  function logout(){
  fetch('http://localhost:4000/logout',{
    credentials: 'include',
    method: 'POST'
  });
  setUserInfo(null);
  }

  const username = userInfo?.username;

    return(
        <header>
        <Link to={"/"} className="logo">My blog</Link>
        <nav>
          {
            username && (
              <>
                <Link to={'/create'}>Create new Post</Link>
                <Link onClick={() => logout()}>Logout</Link>
              </>
            )
          }
          {
            !username && (
              <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Regiter</Link>
              </>
            )
          }
        </nav>
      </header>
    )
}