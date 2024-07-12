import React from 'react'

const Manage = () => {
  return (
    <div className="container-fluid">
    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
              <a href="home">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="projects">
                Projects
              </a>
            </li>
            <li className="breadcrumb-item active">
              Favorite
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <span className="badge bg-primary">
          Default View
        </span>
      </div>
      <div>
        <a href="projects/list/favorite">
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
    <div className="row">
      <div className="col-md-3 mb-3">
        <select
          aria-label="Default select example"
          className="form-select"
          id="status_filter"
        >
          <option value="">
            Filter by Status
          </option>
          <option value="0">
            Default
          </option>
          <option value="1">
            Started
          </option>
          <option value="2">
            On Going
          </option>
          <option value="59">
            In Review
          </option>
        </select>
      </div>
      <div className="col-md-3 mb-3">
        <select
          aria-label="Default select example"
          className="form-select"
          id="sort"
        >
          <option value="">
            Sort By
          </option>
          <option value="newest">
            Newest
          </option>
          <option value="oldest">
            Oldest
          </option>
          <option value="recently-updated">
            Most Recently Updated
          </option>
          <option value="earliest-updated">
            Least Recently Updated
          </option>
        </select>
      </div>
      <div className="col-md-5 mb-3">
        <select
          className="form-control js-example-basic-multiple"
          data-placeholder="Filter By Tags"
          id="selected_tags"
          multiple
          name="tag[]"
        >
          <option value="6">
            Web Development
          </option>
          <option value="7">
            E-commerce
          </option>
          <option value="8">
            Social Networking
          </option>
          <option value="9">
            Content Management
          </option>
          <option value="10">
            Project Management
          </option>
          <option value="11">
            Learning and Education
          </option>
          <option value="12">
            Booking and Reservation
          </option>
          <option value="22">
            abc
          </option>
          <option value="23">
            prueba
          </option>
          <option value="24">
            pROJECT CONTENT
          </option>
          <option value="25">
            PD
          </option>
          <option value="26">
            BE
          </option>
          <option value="27">
            LE
          </option>
          <option value="28">
            Renewal
          </option>
          <option value="29">
            Live Transfer Implementation
          </option>
          <option value="30">
            gccgcfgh
          </option>
          <option value="31">
            111
          </option>
          <option value="32">
            eee
          </option>
          <option value="33">
            Hh
          </option>
          <option value="34">
            Villa
          </option>
          <option value="35">
            Koha
          </option>
          <option value="36">
            sdfsd
          </option>
          <option value="37">
            From
          </option>
          <option value="38">
            as
          </option>
          <option value="39">
            test
          </option>
          <option value="40">
            Digital Design
          </option>
          <option value="41">
            Test
          </option>
          <option value="42">
            bb
          </option>
        </select>
      </div>
      <div className="col-md-1">
        <div>
          <button
            className="btn btn-sm btn-primary"
            data-bs-original-title="Filter"
            data-bs-placement="left"
            data-bs-toggle="tooltip"
            id="tags_filter"
            type="button"
          >
            <i className="bx bx-filter-alt" />
          </button>
        </div>
      </div>
    </div>
    <div className="mt-4 d-flex row">
      <div className="col-md-6">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
            </div>
            <div className="d-flex justify-content-between">
              <h4 className="card-title">
                <a
                  href="projects/information/419"
                  target="_blank"
                >
                  <strong>
                    CAM KABİN TEMMUZ
                  </strong>
                </a>
              </h4>
              <div className="d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <a
                    aria-expanded="false"
                    className="mx-2"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i
                      className="bx bx-cog"
                      id="settings-icon"
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <a
                      className="edit-project"
                      data-id="419"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-edit text-primary" />
                        Update
                      </li>
                    </a>
                    <a
                      className="delete"
                      data-id="419"
                      data-reload="true"
                      data-type="projects"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        Delete
                      </li>
                    </a>
                    <a
                      className="duplicate"
                      data-id="419"
                      data-reload="true"
                      data-title="CAM KABİN TEMMUZ"
                      data-type="projects"
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
                  data-id="419"
                  data-type="project"
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
                  href="javascript:void(0);"
                >
                  <i
                    className="bx bxs-star favorite-icon text-warning"
                    data-bs-original-title="Click to Remove from Favorite"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                    data-favorite="1"
                    data-id="419"
                  />
                </a>
                <a
                  href="chat?type=project&id=419"
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
            <div className="my-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="statusSelect"
                  >
                    Status
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-info"
                      data-id="419"
                      data-original-color-class="select-bg-label-info"
                      data-original-status-id="2"
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
                        selected
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
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="prioritySelect"
                  >
                    Priority
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-secondary"
                      data-id="419"
                      data-original-color-class="select-bg-label-secondary"
                      data-original-priority-id=""
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
                </div>
              </div>
            </div>
            <div className="my-4 d-flex justify-content-between">
              <span>
                <i className="bx bx-task text-primary" />
                {' '}
                <b>
                  2
                </b>
                {' '}Tasks
              </span>
              <a href="projects/tasks/draggable/419">
                <button
                  className="btn btn-sm rounded-pill btn-outline-primary"
                  type="button"
                >
                  Tasks
                </button>
              </a>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <p className="card-text">
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
                        src="storage/photos/hVyxYeEI6nCyPnh7xAnTcsO3v3nkjhAyznpoLlQ2.webp"
                      />
                    </a>
                  </li>
                  <li
                    className="avatar avatar-sm pull-up"
                    title="HAKAN YOK"
                  >
                    <a
                      href="/users/profile/130"
                      target="_blank"
                    >
                      <img
                        alt="HAKAN YOK"
                        className="rounded-circle"
                        src="storage/photos/no-image.jpg"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="419"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
              <div className="col-md-6">
                <p className="card-text">
                  Clients:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <span className="badge bg-primary">
                    Not Assigned
                  </span>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="419"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 text-start">
                <i className="bx bx-calendar text-success" />
                Starts At : June 30, 2024
              </div>
              <div className="col-md-6 text-end">
                <i className="bx bx-calendar text-danger" />
                Ends At : June 30, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
            </div>
            <div className="d-flex justify-content-between">
              <h4 className="card-title">
                <a
                  href="projects/information/414"
                  target="_blank"
                >
                  <strong>
                    I want to eat
                  </strong>
                </a>
              </h4>
              <div className="d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <a
                    aria-expanded="false"
                    className="mx-2"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i
                      className="bx bx-cog"
                      id="settings-icon"
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <a
                      className="edit-project"
                      data-id="414"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-edit text-primary" />
                        Update
                      </li>
                    </a>
                    <a
                      className="delete"
                      data-id="414"
                      data-reload="true"
                      data-type="projects"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        Delete
                      </li>
                    </a>
                    <a
                      className="duplicate"
                      data-id="414"
                      data-reload="true"
                      data-title="I want to eat"
                      data-type="projects"
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
                  data-id="414"
                  data-type="project"
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
                  href="javascript:void(0);"
                >
                  <i
                    className="bx bxs-star favorite-icon text-warning"
                    data-bs-original-title="Click to Remove from Favorite"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                    data-favorite="1"
                    data-id="414"
                  />
                </a>
                <a
                  href="chat?type=project&id=414"
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
            <div className="my-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="statusSelect"
                  >
                    Status
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-warning"
                      data-id="414"
                      data-original-color-class="select-bg-label-warning"
                      data-original-status-id="59"
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
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="prioritySelect"
                  >
                    Priority
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-secondary"
                      data-id="414"
                      data-original-color-class="select-bg-label-secondary"
                      data-original-priority-id=""
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
                </div>
              </div>
            </div>
            <div className="my-4 d-flex justify-content-between">
              <span>
                <i className="bx bx-task text-primary" />
                {' '}
                <b>
                  2
                </b>
                {' '}Tasks
              </span>
              <a href="projects/tasks/draggable/414">
                <button
                  className="btn btn-sm rounded-pill btn-outline-primary"
                  type="button"
                >
                  Tasks
                </button>
              </a>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <p className="card-text">
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
                        src="storage/photos/hVyxYeEI6nCyPnh7xAnTcsO3v3nkjhAyznpoLlQ2.webp"
                      />
                    </a>
                  </li>
                  <li
                    className="avatar avatar-sm pull-up"
                    title="ABC PQR"
                  >
                    <a
                      href="/users/profile/80"
                      target="_blank"
                    >
                      <img
                        alt="ABC PQR"
                        className="rounded-circle"
                        src="storage/photos/YCsdBJkGDMN9Z7Q11gYQxX4umxlQ1LgD2SWqvF3w.png"
                      />
                    </a>
                  </li>
                  <li
                    className="avatar avatar-sm pull-up"
                    title="Fig manager"
                  >
                    <a
                      href="/users/profile/103"
                      target="_blank"
                    >
                      <img
                        alt="Fig manager"
                        className="rounded-circle"
                        src="storage/photos/no-image.jpg"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="414"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
              <div className="col-md-6">
                <p className="card-text">
                  Clients:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                    className="avatar avatar-sm pull-up"
                    title="Client One"
                  >
                    <a
                      href="/clients/profile/78"
                      target="_blank"
                    >
                      <img
                        alt="Client One"
                        className="rounded-circle"
                        src="storage/photos/hQnFHNiMcLEUfdHDrKYp5Eu9xgW6ThWOxkk6iMSM.png"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="414"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 text-start">
                <i className="bx bx-calendar text-success" />
                Starts At : June 27, 2024
              </div>
              <div className="col-md-6 text-end">
                <i className="bx bx-calendar text-danger" />
                Ends At : June 27, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
              <span className="badge bg-secondary mt-1">
                E-commerce
              </span>
              <span className="badge bg-success mt-1">
                Social Networking
              </span>
              <span className="badge bg-warning mt-1">
                Project Management
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <h4 className="card-title">
                <a
                  href="projects/information/412"
                  target="_blank"
                >
                  <strong>
                    EDmS
                  </strong>
                </a>
              </h4>
              <div className="d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <a
                    aria-expanded="false"
                    className="mx-2"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i
                      className="bx bx-cog"
                      id="settings-icon"
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <a
                      className="edit-project"
                      data-id="412"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-edit text-primary" />
                        Update
                      </li>
                    </a>
                    <a
                      className="delete"
                      data-id="412"
                      data-reload="true"
                      data-type="projects"
                      href="javascript:void(0);"
                    >
                      <li className="dropdown-item">
                        <i className="menu-icon tf-icons bx bx-trash text-danger" />
                        Delete
                      </li>
                    </a>
                    <a
                      className="duplicate"
                      data-id="412"
                      data-reload="true"
                      data-title="EDmS"
                      data-type="projects"
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
                  data-id="412"
                  data-type="project"
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
                  href="javascript:void(0);"
                >
                  <i
                    className="bx bxs-star favorite-icon text-warning"
                    data-bs-original-title="Click to Remove from Favorite"
                    data-bs-placement="right"
                    data-bs-toggle="tooltip"
                    data-favorite="1"
                    data-id="412"
                  />
                </a>
                <a
                  href="chat?type=project&id=412"
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
            <div className="my-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="statusSelect"
                  >
                    Status
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-warning"
                      data-id="412"
                      data-original-color-class="select-bg-label-warning"
                      data-original-status-id="59"
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
                </div>
                <div className="col-md-6">
                  <label
                    className="form-label"
                    htmlFor="prioritySelect"
                  >
                    Priority
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select form-select-sm select-bg-label-secondary"
                      data-id="412"
                      data-original-color-class="select-bg-label-secondary"
                      data-original-priority-id=""
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
                </div>
              </div>
            </div>
            <div className="my-4 d-flex justify-content-between">
              <span>
                <i className="bx bx-task text-primary" />
                {' '}
                <b>
                  3
                </b>
                {' '}Tasks
              </span>
              <a href="projects/tasks/draggable/412">
                <button
                  className="btn btn-sm rounded-pill btn-outline-primary"
                  type="button"
                >
                  Tasks
                </button>
              </a>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <p className="card-text">
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
                        src="storage/photos/hVyxYeEI6nCyPnh7xAnTcsO3v3nkjhAyznpoLlQ2.webp"
                      />
                    </a>
                  </li>
                  <li
                    className="avatar avatar-sm pull-up"
                    title="Member Infinitie"
                  >
                    <a
                      href="/users/profile/77"
                      target="_blank"
                    >
                      <img
                        alt="Member Infinitie"
                        className="rounded-circle"
                        src="storage/photos/52QT0GZtlcJeTF6iDiE2yHUWNJpHFhLlHZsyk37p.png"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="412"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
              <div className="col-md-6">
                <p className="card-text">
                  Clients:
                </p>
                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                  <li
                    className="avatar avatar-sm pull-up"
                    title="saifullah muhamad"
                  >
                    <a
                      href="/clients/profile/79"
                      target="_blank"
                    >
                      <img
                        alt="saifullah muhamad"
                        className="rounded-circle"
                        src="storage/photos/5T3aPGOsEP60ie0o0hv8iOic1B95X3FAb89s7cbr.png"
                      />
                    </a>
                  </li>
                  <li
                    className="avatar avatar-sm pull-up"
                    title="Kellan Ashford"
                  >
                    <a
                      href="/clients/profile/81"
                      target="_blank"
                    >
                      <img
                        alt="Kellan Ashford"
                        className="rounded-circle"
                        src="storage/photos/kEBFb0dppRONSZv9LD4Vsvgo4It5OFne0R4MSlH0.png"
                      />
                    </a>
                  </li>
                  <a
                    className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-project update-users-clients"
                    data-id="412"
                    href="javascript:void(0)"
                  >
                    <span className="bx bx-edit" />
                  </a>
                </ul>
                <p />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 text-start">
                <i className="bx bx-calendar text-success" />
                Starts At : June 27, 2024
              </div>
              <div className="col-md-6 text-end">
                <i className="bx bx-calendar text-danger" />
                Ends At : June 29, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Manage
