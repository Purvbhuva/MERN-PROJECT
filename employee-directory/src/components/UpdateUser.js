import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser(props) {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const apiURL = "http://localhost:8000";

  useEffect(() => {
    fetch(`${apiURL}/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  const updateUser = (id) => {
    fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => navigate(-1));
  };
  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    //   EmployeeID: props.length,
    });
  };
  return (
    <>
      <div className="card m-3 mx-auto" style={{ width: "18rem" }}>
        <div className="card-body container">
          <input
            type="text"
            name="Name"
            placeholder="Enter Employee Name"
            value={data.Name}
            className="form-control mb-2"
            onChange={(e) => {
              inputChange(e);
            }}
          />
          <input
            type="text"
            name="Description"
            placeholder="Enter Employee Description"
            value={data.Description}
            className="form-control mb-2"
            onChange={(e) => {
              inputChange(e);
            }}
          />
          <input
            type="text"
            name="Position"
            placeholder="Enter Employee Position"
            value={data.Position}
            className="form-control mb-2"
            onChange={(e) => {
              inputChange(e);
            }}
          />
          <input
            type="text"
            name="Salary"
            placeholder="Enter Employee Salary"
            value={data.Salary}
            className="form-control mb-3"
            onChange={(e) => {
              inputChange(e);
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              updateUser(id);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
