import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProject = () => {
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/project/getProject/${id}`)
      .then((res) => {
        setProjectName(res.data.projectName);
        setProjectDescription(res.data.projectDescription);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch project data");
      });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "projectName") {
      setProjectName(e.target.value);
    } else if (e.target.name === "projectDescription") {
      setProjectDescription(e.target.value);
    } else if (e.target.name === "status") {
      setStatus(e.target.value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:5000/project/editProject/${id}`, {
        projectName,
        projectDescription,
        status,
      })
      .then((res) => {
        navigate("/manage");
        Swal.fire({
          position: 'top-end',
          title: 'Project Edited Successfully',
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal'
          },
          timer: 1500
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-3 mb-3">
        <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Edit Project
            </h5>
          </div>
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
                  value={projectName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label" htmlFor="status">
                  Status
                </label>
                <div className="input-group">
                  <select
                    className="form-select text-capitalize"
                    name="status"
                    value={status}
                    onChange={handleChange}
                  >
                    <option value="">Default</option>
                    <option value="started">Started</option>
                    <option value="ongoing">On Going</option>
                    <option value="inreview">In Review</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Project Description</label>
                <textarea
                  className="form-control"
                  name="projectDescription"
                  rows={3}
                  value={projectDescription}
                  onChange={handleChange}
                  placeholder="Project Description"
                />
              </div>
              {error &&  
               <div className="col-12 mb-0">
                <div className="alert alert-warning">
                  <p className="mb-0 text-center">
                  {error}
                  </p>
                </div>
              </div>}
              <div className="modal-footer m-0 p-0">
                <button
                  type="button"
                  className="m-0 me-2 btn btn-secondary"
                    onClick={() => navigate("/manage")}
        >
                  Close
                </button>
                <button
                  type="submit"
                  id="submit_btn"
                  className="m-0 me-2 btn btn-warning"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProject;
