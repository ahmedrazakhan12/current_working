import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import io from "socket.io-client";
import '../../App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const socket = io("http://localhost:5000");

const Addtasks = () => {
  const {id} = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [users, setUsers] = useState("");
  const [note, setNote] = useState("");
  const [username, setUsername] = useState(""); 
  const [error, setError] = useState(false);
  const [usersID, setUsersID] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [content, setContent] = useState('');
  const [dbStatus , setDbStatus] = useState([]);
  const [dbPriorities , setDbPriorities] = useState([]);
  const [projectDetails ,setProjectDetails] = useState('');


  console.log(priority , status);
  // const predefinedTags = ["Web Development", "E-commerce", "Social Networking", "Content Management", "Project Management", "Learning and Education", "Booking and Reservation"];

  const navigate = useNavigate();
  const activeId = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`http://localhost:5000/projectPriority/getAllPriorities`)
    .then((res) => {
      setDbPriorities(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
    .then((res) => {
      setDbStatus(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

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
      // console.log(`New project added by ${data.username}: ${data.taskName}`);
      // Swal.fire({
      //   title: 'New Project Added',
      //   text: `User ${data.username} added a new project: ${data.taskName}`,
      //   icon: 'info',
      //   timer: 3000
      // });
    });

    return () => {
      socket.off('projectAdded');
    };
  }, []);

  useEffect(()=>{
    axios.get(`http://localhost:5000/project/getProject/${id}`)
    .then((res) => {
      console.log(res.data[0].project.id);
        setProjectDetails(res.data[0].project)

    })
    .catch((err) => {
        console.log(err);
    });
},[])
// console.log("././././././././././././././././/./",projectDetails);
const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "taskName":
        setTaskName(value);
        break;
      case "taskDescription":
        setTaskDescription(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "priority":
        setPriority(value);
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
      
      case "note":
        setNote(value);
        break;
      default:
        break;
    }
  };

  

  const max = 10;
  const duplicate = false;

  const addTag = (tag) => {
    if (anyErrors(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    setInputValue('');
    setSuggestions([]);
  };

  const deleteTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    setUsersID((prevIDs) => prevIDs.filter((_, i) => i !== index));
  };

  const anyErrors = (tag) => {
    if (max !== null && tags.length >= max) {
      console.log('Max tags limit reached');
      return true;
    }
    if (!duplicate && tags.includes(tag)) {
      console.log(`Duplicate found: "${tag}"`);
      return true;
    }
    return false;
  };

  const handleKeyDown = (e) => {
    const trimmedValue = inputValue.trim();
    if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
      e.preventDefault();
      if (suggestions.some(suggestion => suggestion.name === trimmedValue)) {
        addTag(trimmedValue);
      } else {
        console.log(`"${trimmedValue}" is not a valid selection.`);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      axios.get(`http://localhost:5000/project/getProject/${id}`)
        .then((res) => {
            setSuggestions(res.data[0].users);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (tag) => {
    addTag(tag.name);
    setUsersID((prevIDs) => [...prevIDs, tag.id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/task/addTask", {
        taskName,
        taskDescription: content,
        status,
        priority,
        startAt,
        endAt,
        usersID,
        note,
        projectName: projectDetails.projectName,
        projectId:projectDetails.id,
        username,
        activeId
      });
      navigate(-1);
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
            <div className="mb-3 col-12">
              <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
              <input className="form-control" type="text" name="taskName" placeholder="Please Enter Title" onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6">
              
                  <label className="form-label" htmlFor="status">Status</label>
                  <select className="form-select text-capitalize" name="status" onChange={handleChange}>
                    <option value="">Select Status</option>
                    {dbStatus.map((item, index) => (
                      <option key={index} value={item.id}>{item.status}</option>
                    ))}
                  </select>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select className="form-select text-capitalize" name="priority" onChange={handleChange}>
                    <option value="">Select Status</option>
                    {dbPriorities.map((item, index) => (
                      <option key={index} value={item.id}>{item.status}</option>
                    ))}
                  </select>
                
            </div>
          
             <div className="mb-3 col-12">
             <label className="form-label" htmlFor="startAt">Project</label>
             <input className="form-control" type="text" value={projectDetails ? projectDetails.projectName: "null"} name="project" readOnly />
           </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="startAt">Starts At</label>
              <input className="form-control" type="date" name="startAt" onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="endAt">Ends At</label>
              <input className="form-control" type="date" name="endAt" onChange={handleChange} />
            </div>
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="users">Select Users</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <a onClick={() => deleteTag(index)}>&times;</a> 
                  </span>
                ))}
                <input
                  id="tag-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type to search"
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
                {suggestions.length === 0 && inputValue.length > 0 && (
                  <ul className="suggestions-list">
                    <li>No User Found</li>
                  </ul>
                )}
              </div>
            </div>
        
            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    value={taskDescription}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />
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

export default Addtasks;
