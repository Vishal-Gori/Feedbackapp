import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import {ref, set, get, child } from "firebase/database"
import { useNavigate } from "react-router-dom";
import db from "./FbConfig";

export default function CreateReview() {

    const nav = useNavigate();
    const [rno, setRno] =useState("");
    const [name, setName ] = useState("");
    const [email, setEmail] =useState("");
    const [marks, setMarks] = useState("");

    const hRno = (event) => {setRno(event.target.value);}
    const hName = (event) => {setName(event.target.value);}
    const hEmail = (event) => {setEmail(event.target.value);}
    const hMarks = (event) => {setMarks(event.target.value);}

    useEffect(() => {
		let un = localStorage.getItem("un");
		if (un != null) {
			setEmail(un)
		}
		else {
			nav("/login");
		}
	}, [nav]);

    const save = (event) => {
        event.preventDefault();
        const r1 = ref(db);
        get(child(r1, "student/" +rno))
        .then( (snapshot) => {
            if(snapshot.exists()){
                alert(email + " already exists")
                setRno("");
                setName("");
                setEmail("");
                setMarks("");
            }
            else {
                let data = {rno, name, email, marks};
                const r2 = ref(db, "student/"+rno);
                set(r2,data);
                alert("record created");
                setRno("");
                setName("");
                setEmail("");
                setMarks("");
            }
        })
        .catch(err => console.log(err));
    }


    return(
        <>
        <center>
        <NavBar />
            <h1>Enter Student Info</h1>
            <form onSubmit={save}>
            <input type="email" placeholder="Enter Email" onChange={hEmail} value={email} disabled/>
                <br/><br/>
                <input type="number" placeholder="Enter Roll No." onChange={hRno} value={rno}/>
                <br/><br/>
                <input type="text" placeholder="Enter Name" onChange={hName} value={name}/>
                <br/><br/>
                <input type="text" placeholder="Enter Review" onChange={hMarks} value={marks}/>
                <br/><br/>
                <input type="submit" value="Save"/>

            </form>
        </center>
        </>
    );
}