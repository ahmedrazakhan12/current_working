import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import io from "socket.io-client";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../App.css';

const socket = io("http://localhost:5000");

const UpdateTasks = () => {
    const { id } = useParams();
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [note, setNote] = useState("");
    const [username, setUsername] = useState(""); 
    const [newUsers, setNewUsers] = useState([]);
    const [error, setError] = useState(false);
    const [usersID, setUsersID] = useState([]); 
    const [deleteUsers, setDeleteUsers] = useState([]);   
    console.log("deleteUsers: ",deleteUsers);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [content, setContent] = useState('');
    const [dbStatus, setDbStatus] = useState([]);
    const [dbPriorities, setDbPriorities] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null); 
    const [tags1, setTags1] = useState([]);
    console.log("tags1: ",tags1);
  
    const navigate = useNavigate();
    const activeId = localStorage.getItem("id");
  
    useEffect(() => {
      axios.get(`http://localhost:5000/task/getTask/${id}`)
        .then((res) => {
          const project = res.data[0]?.task;
          const users = res.data[0]?.users;
          console.log("res.data[0]?.task: " , res.data[0]?.users);
  
          setTaskName(project?.taskName || "");
          setTaskDescription(project?.taskDescription || "");
          setStatus(project?.status || "");
          setPriority(project?.priority || "");
          setStartAt(project?.startAt || "");
          setEndAt(project?.endAt || "");
          setUsersID(project?.usersID || []);
          setNote(project?.note || "");
          setContent(project?.taskDescription || ""); 
          setTags1(project?.tags || []);
          setProjectDetails(project);
  
          if (users) {
              setNewUsers(users);
            }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
  
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
        // Handle projectAdded event
      });
  
      return () => {
        socket.off('projectAdded');
      };
  
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case "taskName":
          setTaskName(value);
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
        case "note":
          setNote(value);
          break;
        default:
          break;
      }
    };
  
    const handleCKEditorChange = (event, editor) => {
      const data = editor.getData();
      setContent(data);
    };
  
    useEffect(() => {
      if (Array.isArray(newUsers)) {
          setTags1(newUsers.map(user => user)); // Assuming user objects have a `name` property
      }
    }, [newUsers]);
  
    const max = 10;
    const duplicate = false;
    
  
    const deleteTag = (index) => {
      setTags((prevTags) => prevTags.filter((_, i) => i !== index));
      setUsersID((prevIDs) => prevIDs.filter((_, i) => i !== index));
    //   console.log("deleteUsersID: ",index);
    //   setDeleteUsers((prevDeleteIDs) => [...prevDeleteIDs, id]);
    };
  
    const deleteDbTag = (index, id) => {
         setTags1((prevTags) => prevTags.filter((_, i) => i !== index));

        console.log("deleteUsersID: ",id);
        setDeleteUsers((prevDeleteIDs) => [...prevDeleteIDs, id]);
      };
      const anyErrors = (tag) => {
        if (max !== null && tags.length >= max) {
            console.log('Max tags limit reached');
            return true;
        }
        const dbTag = tags1.find((t) => t.name === tag);
        
        if (tags.includes(tag)) {
            console.log(`Duplicate found: "${tag}"`);
            return true;
        }
        return false;
      };
      

      const addTag = (tag) => {
        const tagName = typeof tag === 'object' ? tag.name : tag; // Adjust based on tag type
        if(tags1.find((t) => t.name === tagName)){
        return;
        }
        if (anyErrors(tagName)) return;
        setTags([...tags, tagName]);
        setUsersID([...usersID, tag.id]);
        setInputValue('');
        setSuggestions([]);
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
      const value = e.target.value;
      setInputValue(value);
      if (value) {
          axios.get(`http://localhost:5000/project/getProject/${projectDetails.projectId}`)
            .then((res) => {
              setSuggestions(res.data[0]?.users || []);
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
          setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
        addTag(suggestion);
     
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/task/editTask/${id}`, {
          taskName,
          taskDescription: content,
          status,
          priority,
          startAt,
          endAt,
          usersID,
          note,
          username,
          activeId,
          deleteUsers
        });
        navigate(-1);
        Swal.fire({
          position: 'top-end',
          title: 'Project Updated Successfully',
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal'
          },
          timer: 1500
        });
      } catch (error) {
        console.error("Error updating task:", error);
        setError(error.response?.data?.message || "An error occurred");
      }
    };
  return (
    <div className="container-fluid mt-3 mb-3">
      <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">Update Project</h5>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="mb-3 col-12">
              <label htmlFor="taskName" className="form-label">Title <span className="asterisk">*</span></label>
              <input className="form-control" type="text" name="taskName" placeholder="Please Enter Title" value={taskName} onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="status">Status</label>
              <select className="form-select text-capitalize" name="status" onChange={handleChange} value={status}>
                <option value="">Select Status</option>
                {dbStatus.map((item, index) => (
                  <option key={index} value={item.status}>{item.status}</option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select className="form-select text-capitalize" name="priority" onChange={handleChange} value={priority}>
                <option value="">Select Priority</option>
                {dbPriorities.map((item, index) => (
                  <option key={index} value={item.status}>{item.status}</option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="project">Project</label>
              <input className="form-control" type="text" value={projectDetails ? projectDetails.projectName : "null"} name="project" readOnly />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="startAt">Starts At</label>
              <input className="form-control" type="date" name="startAt" value={startAt} onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="endAt">Ends At</label>
              <input className="form-control" type="date" name="endAt" value={endAt} onChange={handleChange} />
            </div>
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="users">Select Users</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
              {tags1.map((tag, index) => (
                <span key={index} className="tag">
                    {tag.name}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteDbTag(index, tag.id )}>&times;</a> 

                </span>
             ))}
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteTag(index )}>&times;</a> 

                </span>
            ))}
            
            
            {/* {tags1.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteTag(index )}>&times;</a> 

                </span>
             ))} */}
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
                            {suggestion.name} {/* Change to the appropriate property */}
                        </li>
                        
                    ))}
                </ul>
            )}
             {suggestions.length === 0 && inputValue.length > 0 && (
                <ul className="suggestions-list">
                        <li>
                            No User Found
                        </li>
                        
                </ul>
            )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={handleCKEditorChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Note</label>
              <textarea className="form-control" name="note" rows={3} value={note} onChange={handleChange} placeholder="Enter Note" />
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
              <button type="submit" id="submit_btn" className="m-0 me-2 btn btn-warning">Update</button>
            </div>
          </div>
        </div>
      </form>

    
    </div>
  );
};

export default UpdateTasks;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import io from "socket.io-client";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '../../App.css';

// const socket = io("http://localhost:5000");

// const UpdateTasks = () => {
//     const { id } = useParams();
//     const [taskName, setTaskName] = useState("");
//     const [taskDescription, setTaskDescription] = useState("");
//     const [status, setStatus] = useState("");
//     const [priority, setPriority] = useState("");
//     const [startAt, setStartAt] = useState("");
//     const [endAt, setEndAt] = useState("");
//     const [note, setNote] = useState("");
//     const [username, setUsername] = useState(""); 
//     const [newUsers, setNewUsers] = useState([]);
//     const [error, setError] = useState(false);
//     const [usersID, setUsersID] = useState([]); 
//     const [deleteUsers, setDeleteUsers] = useState([]);   
//     console.log("deleteUsers: ",deleteUsers);
//     const [tags, setTags] = useState([]);
//     const [inputValue, setInputValue] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [content, setContent] = useState('');
//     const [dbStatus, setDbStatus] = useState([]);
//     const [dbPriorities, setDbPriorities] = useState([]);
//     const [projectDetails, setProjectDetails] = useState(null); 
//     const [tags1, setTags1] = useState([]);
//     console.log("tags1: ",tags1);
  
//     const navigate = useNavigate();
//     const activeId = localStorage.getItem("id");
  
//     useEffect(() => {
//       axios.get(`http://localhost:5000/task/getTask/${id}`)
//         .then((res) => {
//           const project = res.data[0]?.task;
//           const users = res.data[0]?.users;
//           console.log("res.data[0]?.task: " , res.data[0]?.users);
  
//           setTaskName(project?.taskName || "");
//           setTaskDescription(project?.taskDescription || "");
//           setStatus(project?.status || "");
//           setPriority(project?.priority || "");
//           setStartAt(project?.startAt || "");
//           setEndAt(project?.endAt || "");
//           setUsersID(project?.usersID || []);
//           setNote(project?.note || "");
//           setContent(project?.taskDescription || ""); 
//           setTags1(project?.tags || []);
//           setProjectDetails(project);
  
//           if (users) {
//               setNewUsers(users);
//             }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, [id]);
  
//     useEffect(() => {
//       axios.get(`http://localhost:5000/projectPriority/getAllPriorities`)
//         .then((res) => {
//           setDbPriorities(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, []);
  
//     useEffect(() => {
//       axios.get(`http://localhost:5000/projectStatus/getAllStatus`)
//         .then((res) => {
//           setDbStatus(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, []);
  
//     useEffect(() => {
//       axios.get(`http://localhost:5000/admin/adminInfo/`, {
//         headers: { Authorization: `${activeId}` }
//       })
//         .then((res) => {
//           setUsername(res.data.name);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, [activeId]);
  
//     useEffect(() => {
//       socket.on('projectAdded', (data) => {
//         // Handle projectAdded event
//       });
  
//       return () => {
//         socket.off('projectAdded');
//       };
  
//     }, []);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       switch (name) {
//         case "taskName":
//           setTaskName(value);
//           break;
//         case "status":
//           setStatus(value);
//           break;
//         case "priority":
//           setPriority(value);
//           break;
//         case "startAt":
//           setStartAt(value);
//           break;
//         case "endAt":
//           setEndAt(value);
//           break;
//         case "note":
//           setNote(value);
//           break;
//         default:
//           break;
//       }
//     };
  
//     const handleCKEditorChange = (event, editor) => {
//       const data = editor.getData();
//       setContent(data);
//     };
  
//     useEffect(() => {
//       if (Array.isArray(newUsers)) {
//           setTags1(newUsers.map(user => user)); // Assuming user objects have a `name` property
//       }
//     }, [newUsers]);
  
//     const max = 10;
//     const duplicate = false;
    
//     const addTag = (tag) => {
//       if (anyErrors(tag)) return;
//       setTags((prevTags) => [...prevTags, tag]);
//       setSuggestions([]); // Clear suggestions after adding a tag
//     };
  
//     const deleteTag = (index) => {
//       setTags((prevTags) => prevTags.filter((_, i) => i !== index));
//       setUsersID((prevIDs) => prevIDs.filter((_, i) => i !== index));
//     //   console.log("deleteUsersID: ",index);
//     //   setDeleteUsers((prevDeleteIDs) => [...prevDeleteIDs, id]);
//     };
  
//     const deleteDbTag = (index, id) => {
//          setTags1((prevTags) => prevTags.filter((_, i) => i !== index));

//         console.log("deleteUsersID: ",id);
//         setDeleteUsers((prevDeleteIDs) => [...prevDeleteIDs, id]);
//       };
//     const anyErrors = (tag) => {
//       if (max !== null && tags.length >= max) {
//           console.log('Max tags limit reached');
//           return true;
//       }
//       if (!duplicate && tags.includes(tag)) {
//           console.log(`Duplicate found: "${tag}"`);
//           return true;
//       }
//       return false;
//     };
  
//     const handleKeyDown = (e) => {
//       const trimmedValue = inputValue.trim();
//       if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
//           e.preventDefault();
//           if (suggestions.some(suggestion => suggestion.name === trimmedValue)) {
//               addTag(trimmedValue);
//           } else {
//               console.log(`"${trimmedValue}" is not a valid selection.`);
//           }
//       }
//     };
  
//     const handleInputChange = (e) => {
//       const value = e.target.value;
//       setInputValue(value);
//       if (value) {
//           axios.get(`http://localhost:5000/project/getProject/${projectDetails.projectId}`)
//             .then((res) => {
//               setSuggestions(res.data[0]?.users || []);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//       } else {
//           setSuggestions([]);
//       }
//     };
  
//     const handleSuggestionClick = (suggestion) => {
//       setTags([...tags, suggestion.name]); // Ensure `suggestion.name` is a string
//       setUsersID([...usersID, suggestion.id]);
//       setInputValue('');
//       setSuggestions([]);
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await axios.put(`http://localhost:5000/task/editTask/${id}`, {
//           taskName,
//           taskDescription: content,
//           status,
//           priority,
//           startAt,
//           endAt,
//           usersID,
//           note,
//           username,
//           activeId,
//           deleteUsers
//         });
//         navigate(-1);
//         Swal.fire({
//           position: 'top-end',
//           title: 'Project Updated Successfully',
//           showConfirmButton: false,
//           customClass: {
//             popup: 'custom-swal'
//           },
//           timer: 1500
//         });
//       } catch (error) {
//         console.error("Error updating task:", error);
//         setError(error.response?.data?.message || "An error occurred");
//       }
//     };
//   return (
//     <div className="container-fluid mt-3 mb-3">
//       <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
//         <div className="modal-header">
//           <h5 className="modal-title" id="exampleModalLabel1">Update Project</h5>
//         </div>
//         <div className="modal-body">
//           <div className="row">
//             <div className="mb-3 col-12">
//               <label htmlFor="taskName" className="form-label">Title <span className="asterisk">*</span></label>
//               <input className="form-control" type="text" name="taskName" placeholder="Please Enter Title" value={taskName} onChange={handleChange} />
//             </div>
//             <div className="mb-3 col-md-6">
//               <label className="form-label" htmlFor="status">Status</label>
//               <select className="form-select text-capitalize" name="status" onChange={handleChange} value={status}>
//                 <option value="">Select Status</option>
//                 {dbStatus.map((item, index) => (
//                   <option key={index} value={item.status}>{item.status}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3 col-md-6">
//               <label className="form-label" htmlFor="priority">Priority</label>
//               <select className="form-select text-capitalize" name="priority" onChange={handleChange} value={priority}>
//                 <option value="">Select Priority</option>
//                 {dbPriorities.map((item, index) => (
//                   <option key={index} value={item.status}>{item.status}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3 col-12">
//               <label className="form-label" htmlFor="project">Project</label>
//               <input className="form-control" type="text" value={projectDetails ? projectDetails.projectName : "null"} name="project" readOnly />
//             </div>
//             <div className="mb-3 col-md-6">
//               <label className="form-label" htmlFor="startAt">Starts At</label>
//               <input className="form-control" type="date" name="startAt" value={startAt} onChange={handleChange} />
//             </div>
//             <div className="mb-3 col-md-6">
//               <label className="form-label" htmlFor="endAt">Ends At</label>
//               <input className="form-control" type="date" name="endAt" value={endAt} onChange={handleChange} />
//             </div>
//             <div className="mb-3 col-12">
//               <label className="form-label" htmlFor="users">Select Users</label>
//               <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
//               {tags1.map((tag, index) => (
//                 <span key={index} className="tag">
//                     {tag.name}
//                     <a style={{cursor: 'pointer'}} onClick={() => deleteDbTag(index, tag.id )}>&times;</a> 

//                 </span>
//              ))}
//               {tags.map((tag, index) => (
//                 <span key={index} className="tag">
//                     {tag}
//                     <a style={{cursor: 'pointer'}} onClick={() => deleteTag(index )}>&times;</a> 

//                 </span>
//             ))}
            
            
//             {/* {tags1.map((tag, index) => (
//                 <span key={index} className="tag">
//                     {tag}
//                     <a style={{cursor: 'pointer'}} onClick={() => deleteTag(index )}>&times;</a> 

//                 </span>
//              ))} */}
//             <input
//                 id="tag-input"
//                 type="text"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Type to search"
//             />
//             {suggestions.length > 0 && (
//                 <ul className="suggestions-list">
//                     {suggestions.map((suggestion, index) => (
//                         <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                             {suggestion.name} {/* Change to the appropriate property */}
//                         </li>
                        
//                     ))}
//                 </ul>
//             )}
//              {suggestions.length === 0 && inputValue.length > 0 && (
//                 <ul className="suggestions-list">
//                         <li>
//                             No User Found
//                         </li>
                        
//                 </ul>
//             )}
//               </div>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Project Description</label>
//               <CKEditor
//                 editor={ClassicEditor}
//                 data={content}
//                 onChange={handleCKEditorChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Note</label>
//               <textarea className="form-control" name="note" rows={3} value={note} onChange={handleChange} placeholder="Enter Note" />
//             </div>
//             {error && (
//               <div className="col-12 mb-0">
//                 <div className="alert alert-warning">
//                   <p className="mb-0 text-center">{error}</p>
//                 </div>
//               </div>
//             )}
//             <div className="modal-footer m-0 p-0">
//               <button type="button" className="m-0 me-2 btn btn-secondary" onClick={() => navigate("/manage")}>Close</button>
//               <button type="submit" id="submit_btn" className="m-0 me-2 btn btn-warning">Update</button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateTasks;
