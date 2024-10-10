import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import InsertUser from "./InsertUser";
import { useNavigate } from "react-router-dom";

const apiURL = "http://localhost:8000";
export default function Home(props) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${apiURL}`).then(res => res.json()).then(res => setUsers([...res]));
    }, []);
    const deleteUser = (EmployeeID) => fetch(`${apiURL}/${EmployeeID}`, { method: "DELETE" })
        .then(()=>{ setUsers(users.filter((user) => user.EmployeeID !== EmployeeID)) });
    const openInUpdate = (EmployeeID)=>navigate(`/update/${EmployeeID}`)
    return (
        <>
            <div className="d-flex flex-wrap">
                <InsertUser length={users.length + 1} users={users} setUsers={setUsers} />
                {
                    users.map((user, index) => (
                        <UserCard
                            key={index}
                            Name={user.Name}
                            Description={user.Description}
                            Position={user.Position}
                            Salary={user.Salary}
                            deleteUser={() => {deleteUser(user.EmployeeID)}}
                            updateUser={()=>{openInUpdate(user.EmployeeID)}}
                        />
                    ))
                }
            </div>
        </>
    );
}