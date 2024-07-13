import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Addproject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error , setError] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "projectName") {
      setProjectName(e.target.value);
    } else if (e.target.name === "projectDescription") {
      setprojectDescription(e.target.value);
    } else if (e.target.name === "status") {
      setStatus(e.target.value);
    }
  };
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/project/addProject", {
        projectName,
        projectDescription,
        status
      })
      .then((res)=>{
        console.log(res.data);
        navigate("/manage");
        Swal.fire({
          position: 'top-end',
          title: 'Project Added Successfully',
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal'
          },
          timer: 1500
        })
        
      })
      .catch((err)=>{
        setError(err.response.data.message);
        console.log(err);
      })
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="container-fluid mt-3 mb-3">
        <form
          action=""
          className="form-submit-event modal-content"
          onSubmit={handleSubmit}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Create Project
            </h5>
          </div>
          <input
            type="hidden"
            name="_token"
            defaultValue="AhpqFDDgAXeGzec7vsRLszX5WwW2a0IWuPSecwQA"
            autoComplete="off"
          />
          <div className="modal-body">
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="title" className="form-label">
                  Title <span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="projectName"
                  placeholder="Please Enter Title"
                  defaultValue=""
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label" htmlFor="role">
                  Status
                </label>
                <div className="input-group">
                  <select
                    className="form-select text-capitalize"
                    name="status"
                    onChange={handleChange}
                  >
                    <option value={""}>Default</option>
                    <option value={"started"}>Started</option>
                    <option value={"ongoing"}>On Going</option>
                    <option value={"inreview"}>In Review</option>
                  </select>
                </div>
                
              </div>
              <div className="mb-3">
                <label className="form-label">Project Description</label>
                <textarea
                  className="form-control"
                  name="projectDescription"
                  rows={3}
                  onChange={handleChange}
                  placeholder="projectDescription"
                  defaultValue={""}
                />
              </div>
              <div>
              {error &&  
               <div className=" col-12 mb-0">
                <div className="alert alert-warning">
                 
                  <p className="mb-0 text-center">
                  {error}
                  </p>
                </div>
              </div>}
              </div>
              <div className="modal-footer m-0 p-0">
                <button
                  type="button"
                  className="m-0 me-2 btn btn-secondary"
                  onClick={() => navigate("/manage")}
>
                  Close{" "}
                </button>
                <button
                  type="submit"
                  id="submit_btn"
                  className="m-0 me-2 btn btn-warning"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addproject;
