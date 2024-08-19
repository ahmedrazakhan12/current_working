// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function AddTimeModal({ show, handleClose , sendTaskId , projectId }) {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [date, setDate] = useState('');
//   const activeId = localStorage.getItem("id");

//   useEffect(() => {
//     if (!show) {
//       // Reset the state when the modal is closed
//       setHours(0);
//       setMinutes(0);
//       setDate(''); // Reset the date as well
//     }
//   }, [show]);

//   console.log(hours, minutes, date);
  
//   const handleSave = () => {
   
//   };

//   const handlesubmit = (e) => {
//     e.preventDefault(); // Prevents the default form submission behavior
//     const totalTime = `${hours} hour(s) and ${minutes} minute(s)`;
//     alert(projectId)
//     console.log("Sending data:", {
//         userId: activeId,
//         projectId : projectId ,
//         taskId: sendTaskId,
//         hour: hours,
//         min: minutes,
//         date: date
//     });

//     axios.post('http://localhost:5000/task/addTaskTime', {
//         userId: activeId,
//         taskId: sendTaskId,
//         projectId : projectId ,
//         hour: hours,
//         min: minutes,
//         date: date
//     })
//     .then((response) => {
//       Swal.fire({
//         position: "top-end",
//         title: "Time has been successfully saved!",
//         showConfirmButton: false,
//         timer: 1500,
//         customClass: {
//          popup: 'custom-swal' 
//         }
//     });
//         console.log("Server response:", response.data);
//     })
//     .catch((error) => {
//       Swal.fire({
//         position: "top-end",
//         title: "An error occurred while saving the time!",
//         showConfirmButton: false,
//         timer: 1500,
//         customClass: {
//           popup: 'custom-swal-danger' 
//          }
//     });

//         console.error("Error sending data:", error);
//     });

//     console.log('Total Time Worked:', totalTime);
//     handleClose(); // Close the modal after saving
//   };
  
//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter Worked Time {sendTaskId}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handlesubmit}>
//             <Form.Group controlId="formHours">
//               <Form.Label>Hours</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={hours}
//                 onChange={(e) => setHours(parseInt(e.target.value, 10))}
//               >
//                 {[...Array(24).keys()].map((hour) => (
//                   <option key={hour} value={hour}>
//                     {hour}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formMinutes">
//               <Form.Label>Minutes</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={minutes}
//                 onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
//               >
//                 {[0, 15, 30, 45].map((minute) => (
//                   <option key={minute} value={minute}>
//                     {minute}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formDate">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" type="submit">
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default AddTimeModal;

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddTimeModal({ show, handleClose , sendTaskId ,projectId}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const activeId = localStorage.getItem("id");
  const [date, setDate] = useState('');


  useEffect(() => {
    if (!show) {
      // Reset the state when the modal is closed
      setHours(0);
      setMinutes(0);
      setDate('')
    }
  }, [show]);

  console.log(hours, minutes);
  
  const handleSave = () => {
    const totalTime = `${hours} hour(s) and ${minutes} minute(s)`;

    console.log("Sending data:", {
        userId: activeId,
        taskId: sendTaskId,
        hour: hours,
        min: minutes
    });

    axios.post('http://localhost:5000/task/addTaskTime', {
      userId: activeId,
      taskId: sendTaskId,
      projectId : projectId ,
      hour: hours,
      min: minutes,
      date: date
    })
    .then((response) => {
      Swal.fire({
        position: "top-end",
        title: "Time has been successfully saved!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
         popup: 'custom-swal' 
        }
    });
        console.log("Server response:", response.data);
    })
    .catch((error) => {
      Swal.fire({
        position: "top-end",
        title: "Time has been successfully saved!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal-danger' 
         }
    });

        console.error("Error sending data:", error);
    });

    console.log('Total Time Worked:', totalTime);
    handleClose(); // Close the modal after saving
};
const handlesubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    handleSave(); // Calls the handleSave function
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Worked Time {sendTaskId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlesubmit}>
            <Form.Group controlId="formHours">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                as="select"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value, 10))}
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMinutes">
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                as="select"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
              >
                {[0, 15, 30, 45].map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            
             <Form.Group controlId="formDate">
               <Form.Label>Date</Form.Label>
               <Form.Control
                 type="date"
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
               />
             </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTimeModal;
