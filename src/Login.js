import NavBar from "./NavBar.js";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
    
    const nav = useNavigate();
    const [userName, setUserName] = useState("");
    const [pw1, setPw1] = useState("");

    const hUserName = (event) => { setUserName(event.target.value); }
    const hPw1 = (event) => { setPw1(event.target.value); }

    useEffect( () => {
        let userName = localStorage.getItem("un");
        if (userName!=null){
            nav("/home");
        }
    }, [nav]);

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userName, pw1)
        .then((res)=>{
            localStorage.setItem("un", userName);
            nav("/home");
        })
        .catch((err)=>{
            alert("Issue: " + err.message)
        });

    }

    return(
        <>
        <center>
            <NavBar/>
            <h1>Login Page</h1>
            <form onSubmit={check}>
                <input type="text" placeholder={"Enter UserName:"} onChange={hUserName} value={userName}/><br/><br/>
                <input type="password" placeholder={"Enter Password:"} onChange={hPw1} value={pw1}/><br/><br/>
                <input type="submit" value="Login" />
            </form>
        </center>
        </>
    );
}