import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppContext } from '../context/AppContext';

const Meeting = () => {

  const [loginUserInfo, setLoginUserInfo] = useState([]);
  const [meeting , setMeeting] = useState([]);
 


  const navigate = useNavigate();

  const activeId = localStorage.getItem("id");


  const fetchMeetingData = () =>{
    axios.get(`http://localhost:5000/meeting/getMemberMeeting/${activeId}`)
    .then((res) => {
      setMeeting(res.data);
      console.log(res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    fetchMeetingData()
  },[])

  useEffect(() => {
    if (!activeId) {
      navigate("/login"); // Redirect to login
    } else {
      axios
        .get(`http://localhost:5000/admin/adminInfo/`, {
          headers: { Authorization: `${activeId}` },
        })
        .then((res) => {
          setLoginUserInfo(res.data);
          console.log("Navbar: ",res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/login"); // Redirect to login on 404
          }
        });
    }
  }, [activeId]);

 


 

  return (
    <>
    <div className="container-fluid">
    <div className="row">
       <div className="col-lg-12 col-md-12 col-sm-12 col-12">
         <div
           style={{ borderRadius: "6px" }}
           className="card-body p-3  bg-white mt-4 shadow blur border-radius-lg"
         >
           <div className="table-responsive p-2 overflow-hidden">
           <div
               className="pt-2 pb-2 row "
             >
              <h5>Meetings</h5>
         
             </div>

             <table id="table" className="table table-bordered ">
               <thead>
                 <tr>
                   <th style={{}} data-field="id">
                     <div className="th-inner sortable both">ID</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{}} data-field="profile">
                     <div className="th-inner ">Title</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{textAlign: "center"}} data-field="profile">
                     <div className="th-inner ">Creator</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="role">
                     <div className="th-inner ">Users</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="phone">
                     <div className="th-inner sortable both desc">
                       Date
                     </div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="assigned">
                     <div className="th-inner ">Time</div>
                     <div className="fht-cell" />
                   </th>
                   <th style={{ textAlign: "center" }} data-field="assigned">
                     <div className="th-inner ">Link</div>
                     <div className="fht-cell" />
                   </th>
              
                  
                 </tr>
               </thead>
               <tbody>
                 {meeting.map((item, index) => (
                   <tr key={index}>
                     <td>{index + 1}</td>
                     <td>
                       <div className="d-flex mt-2">
                         
                         <div className="mx-2">
                           <h6 className="mb-1 text-capitalize">
                             {item?.meetings?.title}{" "}
                             {/* <span className="badge bg-success">Active</span> */}
                           </h6>
                           <p
                             className="text-muted  "
                             style={{ fontSize: "14px", marginTop: "-4px" }}
                           >
                             {item.email}
                           </p>
                         </div>
                       </div>
                     </td>

                     <td>
                       <div className="d-flex align-items-center justify-content-center mt-2">
                         
                         <div className="mx-2 ">
                           <h6 className="mb-1 text-capitalize badge bg-primary text-center">
                             {item?.creator?.name}{" "}
                             {/* <span className="badge bg-success">Active</span> */}
                           </h6>
                          
                         </div>
                       </div>
                     </td>
                     <td style={{ textAlign: "center" }}>
                       <span
                       >
                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                      {item.users && item.users.length > 0 ? (
                            item.users.map((user, index) => (
                      <>
                        <li
                          className="avatar avatar-sm pull-up"
                          title={user.name}
                        >
                          <Link
                            to={`/Userview/${user.id}`}
                            target="_blank"
                          >
                            
                              <img className="rounded-circle" style={{objectFit:"cover"}} key={index} src={user.pfpImage} alt={user.name} />
                          
                          </Link>
                        </li>
                        </>

                        ))
                      ) : (
                        ''
                      )}

                      {item.users && item.users.length === 0 && (
                        <span className="badge bg-primary">Not Assigned</span>
                      )}
                      </ul>
                       </span>
                     </td>
                     <td className="align-middle text-center text-sm">
                       <p
                         className="text-xs font-weight-bold mb-0"
                         style={{ fontSize: "15px" }}
                       >
                         {item?.meetings?.date}
                       </p>
                     </td>
                     <td className="align-middle text-center text-sm">
                       <p
                         className="text-xs font-weight-bold mb-0"
                         style={{ fontSize: "15px" }}
                       >
                         {item?.meetings?.time}
                       </p>
                     </td>
                     <td className="align-middle text-center text-sm">
                      {item?.meetings?.link ? (<a href={item?.meetings?.link} target="_blank">Join</a>): (<p className="text-xs font-weight-bold mb-0">Not Available</p>)}
                     </td>
                     
                   </tr>
                 ))}
                 {meeting.length === 0 && <tr><td colSpan="6"><p className="text-center mt-2">No meetings yet</p></td></tr>}
               </tbody>
             </table>
           </div>

           {/* Pagination */}
           {/* <Pagination className="mt-3 justify-content-center ">
             <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

             {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
               (number) => {
                 // Limit pagination items to maximum of 10
                 if (
                   number < currentPage + 5 &&
                   number >= currentPage - 4 &&
                   number + 1 <= Math.ceil(data.length / itemsPerPage)
                 ) {
                   return (
                     <Pagination.Item
                       key={number + 1}
                       active={number + 1 === currentPage}
                       onClick={() => paginate(number + 1)}
                     >
                       <span
                         className={
                           number === currentPage - 1
                             ? " text-white text-xs font-weight-bold"
                             : "text-dark text-xs font-weight-bold"
                         }
                       >
                         {number + 1}
                       </span>
                     </Pagination.Item>
                   );
                 } else {
                   return null;
                 }
               }
             )}
             <Pagination.Next
               onClick={nextPage}
               disabled={currentPage === totalPages}
             />
           </Pagination> */}
         </div>
       </div>
   </div>





  
    </div>
 </>
  )
}

export default Meeting
