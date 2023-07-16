/* eslint-disable */
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { ref, child, remove, get } from "firebase/database";
import db from "./FbConfig";
// import { ref, child, remove, get } from "firebase/database";


export default function Home() {

	const nav = useNavigate();
	const [user, setUser] = useState("");
	const [info, setInfo] = useState([]);

	useEffect(() => {

		const dbref = ref(db);

        get(child(dbref, "student/"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setInfo([]);
                    console.log(snapshot.val());
                    const data = snapshot.val()
                    if (data !== null) {
                        Object.values(data).map((da) => {
                            setInfo((oldArray) => [...oldArray, da]);
                        });
                    }
                }
                else {
                    console.log("no data");
                }
            })
            .catch(error => console.log(error));

		let un = localStorage.getItem("un");
		if (un != null) {
			setUser("Welcome " + un);
		}
		else {
			nav("/login");
		}
	}, [nav]);

	const lo = (event) => {
		event.preventDefault();
		localStorage.clear();
		nav("/login");
	}
	const dele = (event) => {
		event.preventDefault();
		const answer = window.confirm("Are you sure??");
		if (answer) {
			const auth = getAuth();
			const users = auth.currentUser;

			deleteUser(users)
				.then(() => {
					localStorage.clear();
					nav("/login");
				})
				.catch(err => alert("Issue " + err));
		}
	}
	const delStu = (rno) => {
		const r3 = ref(db, "student/"+rno);
		remove(r3)
		.then(() => {
			alert("Record Deleted");
			window.location.reload();
		})
		.catch(err => console.log(err));
	}

	return (
		<>
			<center>
				<NavBar />
				<h1> Home Page </h1>
				<h2> {user} </h2>
				<form onSubmit={lo}>
					<input type="submit" value="Logout" />
					<br/><br/>
				</form>
				<form onSubmit={dele}>
					<input type="submit" value="Delete User" />
				</form>
				<br/>
				<table border="5" style={{ width: "50%" }}>
                    <tr>
						<th>Rno.</th>
                        <th>E-Mail</th>
						<th>Name</th>
                        <th>Review</th>
                        <th>Delete</th>
                    </tr>
                    {
                        info.map((e =>
                            <tr style={{ "textAlign": "center" }}>
                                <td>{e.rno}</td>
								<td>{e.email}</td>
                                <td>{e.name}</td>
                                <td>{e.marks}</td>
                                <td><button onClick={() => {
                                    if (window.confirm("Are You Sure???")) delStu(e.rno) }}>Delete</button></td>
                            </tr>
                        ))
                    }
                </table>
			</center>
		</>
	);
}
