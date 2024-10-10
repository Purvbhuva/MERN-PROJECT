import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiURL = "http://localhost:8000";
export default function TableView(props) {
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">EID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Position</th>
                        <th scope="col">Salary</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <th scope="row">{user.EmployeeID}</th>
                            <td>{user.Name}</td>
                            <td>{user.Description}</td>
                            <td>{user.Position}</td>
                            <td>{user.Salary}</td>
                            <td><button onClick={()=>openInUpdate(user.EmployeeID)} className="btn btn-warning">📝</button></td>
                            <td><button onClick={()=>deleteUser(user.EmployeeID)} className="btn btn-danger">🗑</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    );
}