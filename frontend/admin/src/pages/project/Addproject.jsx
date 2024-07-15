import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Addproject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [budget, setBudget] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [users, setUsers] = useState("");
  const [tag, setTag] = useState("");
  const [note, setNote] = useState("");
  const [username, setUsername] = useState(""); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const activeId = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/adminInfo/`, {
        headers: { Authorization: `${activeId}` }
    })
    .then((res) => {
        setUsername(res.data.name);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [activeId]);

  useEffect(() => {
    socket.on('projectAdded', (data) => {
      console.log(`New project added by ${data.username}: ${data.projectName}`);
      Swal.fire({
        title: 'New Project Added',
        text: `User ${data.username} added a new project: ${data.projectName}`,
        icon: 'info',
        timer: 3000
      });
    });

    return () => {
      socket.off('projectAdded');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "projectName":
        setProjectName(value);
        break;
      case "projectDescription":
        setProjectDescription(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "priority":
        setPriority(value);
        break;
      case "budget":
        setBudget(value);
        break;
      case "startAt":
        setStartAt(value);
        break;
      case "endAt":
        setEndAt(value);
        break;
      case "users":
        setUsers(value);
        break;
      case "tag":
        setTag(value);
        break;
      case "note":
        setNote(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/project/addProject", {
        projectName,
        projectDescription,
        status,
        priority,
        budget,
        startAt,
        endAt,
        users,
        tag,
        note,
        username,
        activeId
      });
      navigate("/manage");
      Swal.fire({
        position: 'top-end',
        title: 'Project Added Successfully',
        showConfirmButton: false,
        customClass: {
          popup: 'custom-swal'
        },
        timer: 1500
      });
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="container-fluid mt-3 mb-3">
      <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">Create Project</h5>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
              <input className="form-control" type="text" name="projectName" placeholder="Please Enter Title" onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="status">Status</label>
              <select className="form-select text-capitalize" name="status" onChange={handleChange}>
                <option value="">Default</option>
                <option value="started">Started</option>
                <option value="ongoing">On Going</option>
                <option value="inreview">In Review</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="priority">PRIORITY</label>
              <select className="form-select text-capitalize" name="priority" onChange={handleChange}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="budget">BUDGET</label>
              <input type="number" className="form-control" name="budget" onChange={handleChange} placeholder="Budget" />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="startAt">STARTS AT</label>
              <input className="form-control" type="date" name="startAt" onChange={handleChange} />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="endAt">ENDS AT</label>
              <input className="form-control" type="date" name="endAt" onChange={handleChange} />
            </div>

            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="users">SELECT USERS</label>
              <input className="form-control" type="text" name="users" onChange={handleChange} />
            </div>
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="tag">SELECT TAGS</label>
              <input className="form-control" type="text" name="tag" onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <textarea className="form-control" name="projectDescription" rows={3} onChange={handleChange} placeholder="Project Description" />
            </div>

            <div className="mb-3">
              <label className="form-label">Note</label>
              <textarea className="form-control" name="note" rows={3} onChange={handleChange} placeholder="Enter Note" />
            </div>
            {error && (
              <div className="col-12 mb-0">
                <div className="alert alert-warning">
                  <p className="mb-0 text-center">{error}</p>
                </div>
              </div>
            )}
            <div className="modal-footer m-0 p-0">
              <button type="button" className="m-0 me-2 btn btn-secondary" onClick={() => navigate("/manage")}>Close</button>
              <button type="submit" id="submit_btn" className="m-0 me-2 btn btn-warning">Create</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addproject;



// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const Addproject = () => {
//   const [projectName, setProjectName] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [status, setStatus] = useState("");
//   const [username, setUsername] = useState(""); // Replace with actual username logic
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const activeId = localStorage.getItem("id");

  
//   useEffect(() => {
//     axios.get(`http://localhost:5000/admin/adminInfo/`, {
//         headers: { Authorization: `${activeId}` }
//     })
//     .then((res) => {
//         setUsername(res.data.name);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// }, [activeId]);



//   useEffect(() => {
//     socket.on('projectAdded', (data) => {
//       console.log(`New project added by ${data.username}: ${data.projectName}`);
//       Swal.fire({
//         title: 'New Project Added',
//         text: `User ${data.username} added a new project: ${data.projectName}`,
//         icon: 'info',
//         timer: 3000
//       });
//     });

//     return () => {
//       socket.off('projectAdded');
//     };
//   }, []);

//   const handleChange = (e) => {
//     if (e.target.name === "projectName") {
//       setProjectName(e.target.value);
//     } else if (e.target.name === "projectDescription") {
//       setProjectDescription(e.target.value);
//     } else if (e.target.name === "status") {
//       setStatus(e.target.value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/project/addProject", {
//         projectName,
//         projectDescription,
//         status,
//         username,
//         activeId
//       });
//       navigate("/manage");
//       Swal.fire({
//         position: 'top-end',
//         title: 'Project Added Successfully',
//         showConfirmButton: false,
//         customClass: {
//           popup: 'custom-swal'
//         },
//         timer: 1500
//       });
//     } catch (error) {
//       setError(error.response.data.message);
//       console.error(error);
//     }
//   };

//   return (
//     <>
       
//       <div className="container-fluid mt-3 mb-3">
//         <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel1">Create Project</h5>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               <div className="mb-3 col-md-6">
//                 <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
//                 <input className="form-control" type="text" name="projectName" placeholder="Please Enter Title" onChange={handleChange} />
//               </div>
//               <div className="mb-3 col-md-6">
//                 <label className="form-label" htmlFor="role">Status</label>
//                 <div className="input-group">
//                   <select className="form-select text-capitalize" name="status" onChange={handleChange}>
//                     <option value={""}>Default</option>
//                     <option value={"started"}>Started</option>
//                     <option value={"ongoing"}>On Going</option>
//                     <option value={"inreview"}>In Review</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mb-3 col-md-6">
//                 <label className="form-label" htmlFor="role">PRIORITY</label>
//                 <div className="input-group">
//                   <select className="form-select text-capitalize" name="priority" onChange={handleChange}>
//                   <option value={"high"}>High</option>
//                   <option value={"medium"}>Medium</option>
//                   <option value={"low"}>Low</option>
//                   <option value={"completed"}>Completed</option>

//                   </select>
//                 </div>
//               </div>

//               <div className="mb-3 col-md-6">
//                 <label className="form-label" htmlFor="role">BUDGET</label>
//                 <div class="input-group mb-3">
//                 <div class="input-group-prepend">
//                   <span class="input-group-text" id="basic-addon1">$</span>
//                 </div>
//                 <input type="number" class="form-control" name="budget" onChange={handleChange} placeholder="Budget" aria-label="Username" aria-describedby="basic-addon1" />
//                 </div>
//               </div>

//               <div className="mb-3 col-md-6">
//                 <label className="form-label" htmlFor="role">STARTS AT</label>
//                 <input className="form-control" type="date" name="startAt" onChange={handleChange} />
//               </div>

//               <div className="mb-3 col-md-6">
//                 <label className="form-label" htmlFor="role">ENDS AT</label>
//                 <input className="form-control" type="date" name="endAt" onChange={handleChange} />
//               </div>

//               <div className="mb-3 col-12">
//                 <label className="form-label" htmlFor="role">SELECT USERS</label>
//                 <input className="form-control" type="text" name="users" onChange={handleChange} />
//               </div>
//               <div className="mb-3 col-12">
//                 <label className="form-label" htmlFor="role">SELECT TAGS</label>
//                 <input className="form-control" type="text" name="tag" onChange={handleChange} />
//               </div>


//               <div className="mb-3">
//                 <label className="form-label">Project Description</label>
//                 <textarea className="form-control" name="projectDescription" rows={3} onChange={handleChange} placeholder="Project Description" />
//               </div>


//               <div className="mb-3">
//                 <label className="form-label">Note</label>
//                 <textarea className="form-control" name="note" rows={3} onChange={handleChange} placeholder="Enter Note" />
//               </div>
//               {error && (
//                 <div className="col-12 mb-0">
//                   <div className="alert alert-warning">
//                     <p className="mb-0 text-center">{error}</p>
//                   </div>
//                 </div>
//               )}
//               <div className="modal-footer m-0 p-0">
//                 <button type="button" className="m-0 me-2 btn btn-secondary" onClick={() => navigate("/manage")}>Close</button>
//                 <button type="submit" id="submit_btn" className="m-0 me-2 btn btn-warning">Create</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Addproject;

