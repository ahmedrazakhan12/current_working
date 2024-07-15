import React from 'react'
import Navbar from '../components/Navbar'
const Tasks = () => {
  return (
    <div>
       
      <div className="container-fluid">
  <div className="d-flex justify-content-between mb-2 mt-4">
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-style1">
          <li className="breadcrumb-item">
            <a href="https://taskify.taskhub.company/home">
              Home
            </a>
          </li>
          <li className="breadcrumb-item active">
            Tasks
          </li>
        </ol>
      </nav>
    </div>
    <div>
      <a
        data-bs-target="#create_task_modal"
        data-bs-toggle="modal"
        href="javascript:void(0);"
      >
        <button
          className="btn btn-sm btn-primary"
          data-bs-original-title=" Create Task"
          data-bs-placement="right"
          data-bs-toggle="tooltip"
          type="button"
        >
          <i className="bx bx-plus" />
        </button>
      </a>
      <a href="/tasks">
        <button
          className="btn btn-sm btn-primary"
          data-bs-original-title="List View"
          data-bs-placement="left"
          data-bs-toggle="tooltip"
          type="button"
        >
          <i className="bx bx-list-ul" />
        </button>
      </a>
    </div>
  </div>
  <div
    className="alert alert-primary alert-dismissible"
    role="alert"
  >
    Drag And Drop To Update Task Status !
    <button
      aria-label="Close"
      className="btn-close"
      data-bs-dismiss="alert"
      type="button"
    />
  </div>
  <div
    className="d-flex card flex-row"
    style={{
      overflowX: 'scroll',
      overflowY: 'hidden'
    }}
  >
    <div
      className="my-4"
      style={{
        backgroundColor: 'none',
        maxWidth: '300px',
        minWidth: '300px'
      }}
    >
      <h4 className="fw-bold mx-4 my-2">
        Default
      </h4>
      <div
        className="row m-2 d-flex flex-column"
        data-status="0"
        id="default"
        style={{
          height: '100%'
        }}
      >
        <div
          className="card m-2 shadow"
          data-task-id="93"
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6 className="card-title">
                <a
                  href="https://taskify.taskhub.company/tasks/information/93"
                  target="_blank"
                >
                  <strong>
                    shiva
                  </strong>
                </a>
              </h6>
              <div className="d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <a
                    aria-expanded="false"
                    className="mx-2"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i className="bx bx-cog" />
                  </a>
                  <ul className="dropdown-menu">
                    <a
                      className="edit-task"
                      data-id="93"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-edit text-primary" />
                        {' '}Update
                      </li>
                    </a>
                    <a
                      className="delete"
                      data-id="93"
                      data-reload="true"
                      data-type="tasks"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        {' '}Delete
                      </li>
                    </a>
                    <a
                      className="duplicate"
                      data-id="93"
                      data-reload="true"
                      data-title="shiva"
                      data-type="tasks"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-copy text-warning" />
                        Duplicate
                      </li>
                    </a>
                  </ul>
                </div>
                <a
                  className="quick-view"
                  data-id="93"
                  data-type="task"
                  href="javascript:void(0);"
                >
                  <i
                    className="bx bx bx-info-circle text-info"
                    data-bs-original-title="Quick View"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                  />
                </a>
                <a
                  className="mx-2"
                  href="https://taskify.taskhub.company/chat?type=task&id=93"
                  target="_blank"
                >
                  <i
                    className="bx bx-message-rounded-dots text-danger"
                    data-bs-original-title="Discussion"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                  />
                </a>
              </div>
            </div>
            <div className="card-subtitle text-muted mb-3">
              EcoMarket
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <p className="card-text mb-1">
                  Users:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                    className="avatar avatar-sm pull-up"
                    title="Admin Infinitie"
                  >
                    <a
                      href="/users/profile/7"
                      target="_blank"
                    >
                      <img
                        alt="Admin Infinitie"
                        className="rounded-circle"
                        src="https://taskify.taskhub.company/storage/photos/hVyxYeEI6nCyPnh7xAnTcsO3v3nkjhAyznpoLlQ2.webp"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-task update-users-clients"
                    data-id="93"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
              <div className="col-md-12">
                <p className="card-text mb-1">
                  Clients:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <span className="badge bg-primary">
                    Not Assigned
                  </span>
                </ul>
                <p />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div>
                <label htmlFor="statusSelect">
                  Status
                </label>
                <select
                  className="form-select form-select-sm select-bg-label-danger mb-3"
                  data-id="93"
                  data-original-color-class="select-bg-label-danger"
                  data-original-status-id="0"
                  data-reload="true"
                  data-type="task"
                  id="statusSelect"
                >
                  <option
                    className="badge bg-label-danger"
                    selected
                    value="0"
                  >
                    Default
                  </option>
                  <option
                    className="badge bg-label-primary"
                    value="1"
                  >
                    Started
                  </option>
                  <option
                    className="badge bg-label-info"
                    value="2"
                  >
                    On Going
                  </option>
                  <option
                    className="badge bg-label-warning"
                    value="59"
                  >
                    In Review
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="prioritySelect">
                  Priority
                </label>
                <select
                  className="form-select form-select-sm select-bg-label-secondary"
                  data-id="93"
                  data-original-color-class="select-bg-label-secondary"
                  data-original-priority-id=""
                  data-type="task"
                  id="prioritySelect"
                >
                  <option
                    className="badge bg-label-secondary"
                    value="0"
                  >
                    Default
                  </option>
                </select>
              </div>
              <div className="mt-2">
                <small className="text-muted">
                  Created At: September 18, 2023
                </small>
              </div>
            </div>
            
        
            <div className="d-flex flex-column">
              <div>
                <label htmlFor="statusSelect">
                  Status
                </label>
                <select
                  className="form-select form-select-sm select-bg-label-warning mb-3"
                  data-id="550"
                  data-original-color-class="select-bg-label-warning"
                  data-original-status-id="59"
                  data-reload="true"
                  data-type="task"
                  id="statusSelect"
                >
                  <option
                    className="badge bg-label-danger"
                    value="0"
                  >
                    Default
                  </option>
                  <option
                    className="badge bg-label-primary"
                    value="1"
                  >
                    Started
                  </option>
                  <option
                    className="badge bg-label-info"
                    value="2"
                  >
                    On Going
                  </option>
                  <option
                    className="badge bg-label-warning"
                    selected
                    value="59"
                  >
                    In Review
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="prioritySelect">
                  Priority
                </label>
                <select
                  className="form-select form-select-sm select-bg-label-secondary"
                  data-id="550"
                  data-original-color-class="select-bg-label-secondary"
                  data-original-priority-id=""
                  data-type="task"
                  id="prioritySelect"
                >
                  <option
                    className="badge bg-label-secondary"
                    value="0"
                  >
                    Default
                  </option>
                </select>
              </div>
              <div className="mt-2">
                <small className="text-muted">
                  Created At: July 03, 2024
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Tasks
