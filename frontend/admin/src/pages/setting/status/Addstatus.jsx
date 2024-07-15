import React from 'react'
import { useNavigate } from 'react-router-dom'

const Addstatus = () => {
    const navigate = useNavigate();
  return (
    <div className='container-fluid mt-3'>
      <div className="card px-3 py-4">
        {/* <form action=""> */}
        <h5>Add Status</h5>
        <input type="text" placeholder="Add Status" className='form-control' />
        <div className='mt-3'>
        <button type='submit' className='btn btn-warning  float-end m-0'>Add</button>
        <button type="button" className='btn btn-secondary me-2 float-end m-0' onClick={() => navigate(-1)} >Cancel</button>
        </div>
        {/* </form> */}
      </div>
    </div>
  )
}

export default Addstatus
