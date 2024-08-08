import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
const Notification = () => {
    const [currentItems, setCurrentItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5000/notify/getNotification/${localStorage.getItem("id")}`)
        .then((res) => {
            setCurrentItems(res.data.data);
            console.log(res.data);
            
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    function formatTime(datetimeString) {
        // Convert the string to a Date object
        let dateObj = new Date(datetimeString);
      
        // Extract hours and minutes
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
      
        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
      
        // Add leading zero to minutes if needed
        minutes = minutes < 10 ? '0' + minutes : minutes;
      
        // Return formatted time as a string
        return `${hours}:${minutes} ${ampm}`;
      }
      
      function extractDate(datetimeString) {
        // Convert the string to a Date object
        let dateObj = new Date(datetimeString);
      
        // Extract the month, date, and year
        let month = dateObj.getMonth() + 1; // Months are 0-based in JavaScript
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
      
        // Add leading zero to month and day if needed
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
      
        // Return formatted date as a string
        return `${month}/${day}/${year}`;
      }
  return (
    <div>
       <>
       <div className="container-fluid">

       <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div
              style={{ borderRadius: "6px" }}
              className="card-body p-3  bg-white mt-4 shadow blur border-radius-lg"
              >
            <h4 className='mx-3'>Notifications</h4>
              <div className="table-responsive p-2">
                <table id="table" className="table table-bordered ">
                  <thead>
                    <tr>
                      <th style={{}} data-field="id">
                        <div className="th-inner sortable both">ID</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{}} data-field="profile">
                        <div className="th-inner ">Notification</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="role">
                        <div className="th-inner ">Time</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="phone">
                        <div className="th-inner sortable both desc">
                          Date
                        </div>
                        <div className="fht-cell" />
                      </th>
               
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td onClick={() => navigate(item.route)}>
                          <p
                            className="text-xs font-weight-bold mb-0 cursor-pointer text-capitalize"
                            style={{ fontSize: "15px" }}
                            
                          >
                           <b> {item.text}</b>
                          </p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span
                            className={
                            "badge bg-primary me-1"
                            }
                            style={{ fontSize: "12px", textAlign: "center" }}
                          >
                            {formatTime(item.time)}
                          </span>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <p
                            className="text-xs font-weight-bold mb-0"
                            style={{ fontSize: "15px" }}
                          >
                            {extractDate(item.time)}
                          </p>
                        </td>
                       
                      </tr>
                    ))}

                    {currentItems.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          <p
                            className="text-xs font-weight-bold mb-0"
                            style={{ fontSize: "15px" }}
                          >
                            No Notifications yet!
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              
            </div>
          </div>
      </div>
       </div>
    </>
    </div>
  )
}

export default Notification
