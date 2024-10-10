export default function UserCard(props){
    return(
        <>
        <div className="card m-3" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{props.Name}</h5>
          <p className="card-text">{props.Description}</p>
          <p className="card-text">{props.Position}</p>
          <p className="card-text">{props.Salary}</p>
          <button className="btn btn-danger m-2" onClick={props.deleteUser}>Delete</button>
          <button className="btn btn-info m-2" onClick={props.updateUser}>Update</button>
        </div>
      </div>
        </>
    );
}