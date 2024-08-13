import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AddTimeModal({ show, handleClose , sendTaskId}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const activeId = localStorage.getItem("id");


  useEffect(() => {
    if (!show) {
      // Reset the state when the modal is closed
      setHours(0);
      setMinutes(0);
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
        hour: hours,
        min: minutes
    })
    .then((response) => {
        console.log("Server response:", response.data);
    })
    .catch((error) => {
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTimeModal;
