import { useState } from "react"

export default function RegistePage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    async function register(e){
        e.preventDefault();
        const response = await fetch('http://localhost:4000/register',{
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({username,password}),
                                
                            });
        if (response.status !== 200) {
            alert('Registration failed');
        } else {
            alert('Registration successful');
        }        
    }
    return (
        <form className="register" onSubmit={e => register(e)}>
        <h1>Register</h1>
        <input 
            type="text" 
            placeholder="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} />
        <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} />
        <button>Register</button>
        </form>
    )
}