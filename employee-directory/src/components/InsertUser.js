import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiURL = "http://localhost:8000";

export default function InsertUser(props) {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      fetch(`${apiURL}/${id}`)
        .then((res) => res.json())
        .then((res) => setData(res));
    }
  }, [id]); // Add id as a dependency

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const insertUser = () => {
    fetch(`${apiURL}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => fetch(`${apiURL}`).then(res => res.json()))
      .then(res => props.setUsers([...res]));
  };

  const updateUser = (id) => {
    fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => navigate(-1));
  };

  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <div className="card-body container">
          {/* Render EmployeeID if available */}
          {data.EmployeeID && <p>Employee ID: {data.EmployeeID}</p>}
          
          <input
            type="text"
            name="Name"
            placeholder="Enter Employee Name"
            value={data.Name || ""}
            className="form-control mb-2"
            onChange={inputChange}
          />
          <input
            type="text"
            name="Description"
            placeholder="Enter Employee Description"
            value={data.Description || ""}
            className="form-control mb-2"
            onChange={inputChange}
          />
          <input
            type="text"
            name="Position"
            placeholder="Enter Employee Position"
            value={data.Position || ""}
            className="form-control mb-2"
            onChange={inputChange}
          />
          <input
            type="text"
            name="Salary"
            placeholder="Enter Employee Salary"
            pattern="[0-9]{3,7}"
            value={data.Salary || ""}
            className="form-control mb-3"
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                inputChange(e);
              } else {
                e.target.value = "";
              }
            }}
          />

          {id ? (
            <button
              className="btn btn-primary"
              onClick={() => updateUser(id)}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={insertUser}
            >
              Insert
            </button>
          )}
        </div>
      </div>
    </>
  );
}
