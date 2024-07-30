import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import io from "socket.io-client";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



// const socket = io("http://localhost:5000");

const EditProject = () => {
  const { id } = useParams();
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
  const [usersID ,  setUsersID] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const activeId = localStorage.getItem("id");

  const [newUsers , setNewUsers] = useState([]);
  const [deleteUsers , setDeleteUsers] = useState([]);
  const [deleteTags , setDeleteTags] = useState([]);
    
  const [dbTags , setDbTags] = useState([]);
  const [tags02, setTags02] = useState([]);
  const [inputValue02, setInputValue02] = useState('');
  const [suggestions02, setSuggestions02] = useState([]);
  const predefinedTags = ["Web Development", "E-commerce", "Social Networking", "Content Management", "Project Management", "Learning and Education", "Booking and Reservation"];
  const [content, setContent] = useState('');
  const [dbStatus , setDbStatus] = useState([]);
  const [dbPriorities , setDbPriorities] = useState([]);



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


  // Fetch project details on component mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/project/getProject/${id}`);
        
        // Log the entire response to check its structure
        console.log('API Response:', response.data);
        
        const project = response.data[0].project;
        const users = response.data[0].users;
        const tags = response.data[0].tags;
    
        // Log project and users for verification
        // console.log('Project:', project);
        // console.log('Users:', users);
    
        // Set project data
        setProjectName(project.projectName);
        setProjectDescription(project.projectDescription);
        setStatus(project.status);
        setPriority(project.priority);
        setBudget(project.budget);
        setStartAt(project.startAt);
        setEndAt(project.endAt);
        setTag(project.tag);
        setNote(project.note);
        setContent(project.projectDescription);
        // Set users array to get IDs
        if (users) {
          setNewUsers(users);
          // const userIds = users.map(user => user.name); // Assuming users is an array of user objects
          // setNewUsers(userIds);
        }

        if (tags) {
          setDbTags(tags);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch project details.");
      }
    };
    

    fetchProject();
  }, [id ]);

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

  // useEffect(() => {
  //   socket.on('projectAdded', (data) => {
  //     console.log(`New project added by ${data.username}: ${data.projectName}`);
  //     Swal.fire({
  //       title: 'New Project Added',
  //       text: `User ${data.username} added a new project: ${data.projectName}`,
  //       icon: 'info',
  //       timer: 3000
  //     });
  //   });

  //   return () => {
  //     socket.off('projectAdded');
  //   };
  // }, []);

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
        // setUsers(value);
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


  


  const [tags1, setTags1] = useState([]);
  console.log("tags1: " , tags1);
  const [tags, setTags] = useState([]);
  console.log("newusers:  " , newUsers);
  useEffect(() => {
    if (Array.isArray(newUsers)) {
        setTags(newUsers);
    }
}, [newUsers]);
  // console.log("tags: " , tags);

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const max = 10 ;
  const duplicate = false;
  const addTag = (tag) => {
    if (anyErrors(tag)) return;

    setTags1((prevTags) => [...prevTags, tag]);
    setInputValue('');
    setSuggestions([]); // Clear suggestions after adding a tag
};

const deleteTag = (index , id) => {
  
  
    // Remove corresponding user ID by the same index

    // setDeleteUsers((prevDeleteIDs) => [...prevDeleteIDs, id]);
  // Show SweetAlert for confirmation before setting delete users
      Swal.fire({
        title: 'Are you sure?',
        text: `If you delete the user it will be removed from the assigned tasks`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
    if (result.isConfirmed) {
        // If the user confirms, proceed with setting delete users
        setTags1((prevTags) => prevTags.filter((_, i) => i !== index));
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    setUsersID((prevIDs) => prevIDs.filter((_, i) => i !== index));

        setDeleteUsers((prevDeleteIDs) => [...prevDeleteIDs, id]);

        // Show success message
      
    }
});
};

console.log("deleteTag: ", deleteTags);
const anyErrors = (tag) => {
        if (max !== null && tags.length >= max) {
            console.log('Max tags limit reached');
            return true;
        }
        const dbTag = tags.map(tag => tag.name);
        const mytag = tags1;
        
        if (dbTag.includes(tag)) {
            console.log(`Duplicate found: "${tag}"`);
            return true;
        }
        if (mytag.includes(tag)) {
          console.log(`Duplicate found: "${tag}"`);
          return true;
      }
        return false;
      };

const handleKeyDown = (e) => {
    const trimmedValue = inputValue.trim();
    if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
        e.preventDefault();
        // Only add the tag if it's in the suggestions
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
        axios.get(`http://localhost:5000/admin/search/${e.target.value}`)
            .then((res) => {
                setSuggestions(res.data); // Assuming res.data is an array of user objects
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        setSuggestions([]); // Clear suggestions if input is empty
    }
};

const handleSuggestionClick = (tag) => {
    addTag(tag.name); // Add the tag name
    setUsersID((prevIDs) => [...prevIDs, tag.id]); // Append the user ID
};

const addTag02 = (tagName) => {
  if (anyErrors02(tagName)) return;
  const colorIndex = getRandomColorIndex();
  const tagObject = {
    name: tagName,
    colorIndex: colorIndex,
    colorName: backgroundColor[colorIndex], // Add the color name here
  };
  setTags02((prevTags) => [...prevTags, tagObject]);
  setInputValue02('');
  setSuggestions02([]);
};



const deleteTag02 = (index , id) => {
  setTags02((prevTags) => prevTags.filter((_, i) => i !== index));
  setDeleteTags((prevDeleteIDs) => [...prevDeleteIDs, id]);
  // setDbTags((prevIDs) => prevIDs.filter((_, i) => i !== index));

};



const deleteDbTag02 = (index , id) => {
  // setTags02((prevTags) => prevTags.filter((_, i) => i !== index));
  setDeleteTags((prevDeleteIDs) => [...prevDeleteIDs, id]);
  setDbTags((prevIDs) => prevIDs.filter((_, i) => i !== index));

};

const anyErrors02 = (tag) => {
  // Add error handling logic if needed
  return false;
};

const handleInputChange02 = (e) => {
  setInputValue02(e.target.value);
  // Implement logic to filter suggestions based on user input
  const filteredSuggestions = predefinedTags.filter(tag =>
    tag.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setSuggestions02(filteredSuggestions);
};

const handleSuggestionClick02 = (tag) => {
  addTag02(tag);
};

const handleKeyDown02 = (e) => {
  const trimmedValue = inputValue02.trim();
  if ([9, 13, 188].includes(e.keyCode) && trimmedValue) {
    e.preventDefault();
    addTag02(trimmedValue);
  }
};

const [backgroundColor] = useState([
  'bg-primary',
  'bg-secondary',
  'bg-success',
  'bg-danger',
  'bg-warning',
  'bg-info',
  'bg-dark',
]);
const getRandomColorIndex = () => {
  return Math.floor(Math.random() * backgroundColor.length);
};





const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:5000/project/editProject/${id}`, {
      projectName,
      projectDescription: content,
      status,
      priority,
      budget,
      startAt,
      endAt,
      usersID,
      tags:tags02,
      deleteUsers,
      note,
      username,
      activeId,
      deleteTags
    });
    navigate(-1);
    Swal.fire({
      position: 'top-end',
      title: 'Project Edited Successfully',
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal'
      },
      timer: 1500
    });
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred while updating the project.");
    console.error(err);
  }
};




  return (
    <div className="container-fluid mt-3 mb-3">
      <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">Edit Project</h5>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
              <input className="form-control" type="text" name="projectName" value={projectName} placeholder="Please Enter Title" onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="status">Status</label>
                  <select className="form-select text-capitalize" name="status" onChange={handleChange}>
                    <option value="">Select Status</option>
                    {dbStatus.map((item, index) => (
                      <option key={index} value={item.status}>{item.status}</option>
                    ))}
                  </select>

            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select className="form-select text-capitalize" name="priority" onChange={handleChange}>
                    <option value="">Select Status</option>
                    {dbPriorities.map((item, index) => (
                      <option key={index} value={item.status}>{item.status}</option>
                    ))}
                  </select>
                
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="budget">BUDGET</label>
              <input type="number" className="form-control" name="budget" value={budget} onChange={handleChange} placeholder="Budget" />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="startAt">STARTS AT</label>
              <input className="form-control" type="date" name="startAt" value={startAt} onChange={handleChange} />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="endAt">ENDS AT</label>
              <input className="form-control" type="date" name="endAt" value={endAt} onChange={handleChange} />
            </div>
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="tag">SELECT Users</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input').focus()}>
             
            
            {tags.map((tag, index) => (
                <span key={index} className="tag">
                    {tag.name}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteTag(index , tag.id)}>&times;</a> 

                </span>
            ))}
            {tags1.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteTag(index )}>&times;</a> 

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
            <div className="mb-3 col-12">
              <label className="form-label" htmlFor="tags">Select Tags</label>
              <div className="tags-input-wrapper form-control" onClick={() => document.getElementById('tag-input-02').focus()}>
               
               
                {dbTags.map((tag, index) => (
                  <span key={index} className={`tag02 ${tag.tagColor}`}>
                    {tag.tagName} {/* Render tag.name instead of tag */}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteDbTag02(index , tag.id)}>&times;</a>
                  </span>
                ))}
                 {tags02.map((tag, index) => (
                  <span key={index} className={`tag02 ${backgroundColor[tag.colorIndex]}`}>
                    {tag.name} {/* Render tag.name instead of tag */}
                    <a style={{cursor: 'pointer'}} onClick={() => deleteTag02(index)}>&times;</a>
                  </span>
                ))}

                <input
                  id="tag-input-02"
                  type="text"
                  value={inputValue02}
                  onChange={handleInputChange02}
                  onKeyDown={handleKeyDown02}
                  placeholder="Add a tag"
                />
                {suggestions02.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions02.map((tag, index) => (
                      <li key={index} onClick={() => handleSuggestionClick02(tag)}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                {suggestions02.length === 0 && inputValue02.length > 0 && (
                  <ul className="suggestions-list">
                    <li>No Tag Found</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <div className=''>

                    <div className='' >
                 <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    value={projectDescription}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />

                    </div>
                    </div>
             
             
              {/* <textarea className="form-control" name="projectDescription" rows={3} value={projectDescription} onChange={handleChange} placeholder="Project Description" /> */}
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
              <button type="button" className="m-0 me-2 btn btn-secondary" onClick={() => navigate(-1)}>Close</button>
              <button type="submit" id="submit_btn" className="m-0 me-2 btn btn-warning">Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProject;


// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const EditProject = () => {
//   const { id } = useParams();
//   const [projectName, setProjectName] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/project/getProject/${id}`)
  //     .then((res) => {
  //       setProjectName(res.data.projectName);
  //       setProjectDescription(res.data.projectDescription);
  //       setStatus(res.data.status);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError("Failed to fetch project data");
  //     });
  // }, [id]);

//   const handleChange = (e) => {
//     if (e.target.name === "projectName") {
//       setProjectName(e.target.value);
//     } else if (e.target.name === "projectDescription") {
//       setProjectDescription(e.target.value);
//     } else if (e.target.name === "status") {
//       setStatus(e.target.value);
//     }
//   };

//   const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     axios.put(`http://localhost:5000/project/editProject/${id}`, {
  //       projectName,
  //       projectDescription,
  //       status,
  //     })
  //     .then((res) => {
  //       navigate("/manage");
  //       Swal.fire({
  //         position: 'top-end',
  //         title: 'Project Edited Successfully',
  //         showConfirmButton: false,
  //         customClass: {
  //           popup: 'custom-swal'
  //         },
  //         timer: 1500
  //       });
  //     })
  //     .catch((err) => {
  //       setError(err.response.data.message);
  //       console.log(err);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     setError("An error occurred while submitting the form");
  //   }
  // };

//   return (
//     <>
       
//       <div className="container-fluid mt-3 mb-3">
//         <form className="form-submit-event modal-content" onSubmit={handleSubmit}>
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel1">
//               Edit Project
//             </h5>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               <div className="mb-3 col-md-6">
//                 <label htmlFor="title" className="form-label">
//                   Title <span className="asterisk">*</span>
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="projectName"
//                   placeholder="Please Enter Title"
//                   value={projectName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3 col-md-6">
//                 <label className="form-label" htmlFor="status">
//                   Status
//                 </label>
//                 <div className="input-group">
//                   <select
//                     className="form-select text-capitalize"
//                     name="status"
//                     value={status}
//                     onChange={handleChange}
//                   >
//                     <option value="">Default</option>
//                     <option value="started">Started</option>
//                     <option value="ongoing">On Going</option>
//                     <option value="inreview">In Review</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Project Description</label>
//                 <textarea
//                   className="form-control"
//                   name="projectDescription"
//                   rows={3}
//                   value={projectDescription}
//                   onChange={handleChange}
//                   placeholder="Project Description"
//                 />
//               </div>
//               {error &&  
//                <div className="col-12 mb-0">
//                 <div className="alert alert-warning">
//                   <p className="mb-0 text-center">
//                   {error}
//                   </p>
//                 </div>
//               </div>}
//               <div className="modal-footer m-0 p-0">
//                 <button
//                   type="button"
//                   className="m-0 me-2 btn btn-secondary"
//                     onClick={() => navigate("/manage")}
//         >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   id="submit_btn"
//                   className="m-0 me-2 btn btn-warning"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditProject;
