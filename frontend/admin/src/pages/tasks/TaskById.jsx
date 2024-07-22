import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../App.css';
const TaskById = ({ show, handleClose }) => {
  
  return (
    <Modal show={show} onHide={handleClose} fullscreen={true}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body >
    <div className="container">
 
  <div className="row">
    <div className="col-md-12">
      <div className=" mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <h2 className="fw-bold">
                shiva
                <a
                  href="https://taskify.taskhub.company/chat?type=task&id=93"
                  className="mx-2"
                  target="_blank"
                >
                  <i
                    className="bx bx-message-rounded-dots text-danger"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Discussion"
                  />
                </a>
              </h2>
              <div className="row">
                <div className="col-md-6 mt-3 mb-3">
                  <label className="form-label" htmlFor="start_date">
                    Users
                  </label>
                  <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center flex-wrap">
                    <li
                      className="avatar avatar-sm pull-up"
                      title="Admin Infinitie"
                    >
                      <a
                        href="https://taskify.taskhub.company/users/profile/7"
                        target="_blank"
                      >
                        <img
                          src="https://taskify.taskhub.company/storage/photos/hVyxYeEI6nCyPnh7xAnTcsO3v3nkjhAyznpoLlQ2.webp"
                          className="rounded-circle"
                          alt="Admin Infinitie"
                        />
                      </a>
                    </li>
                    <a
                      href="javascript:void(0)"
                      className="btn btn-icon btn-sm btn-outline-primary btn-sm rounded-circle edit-task update-users-clients"
                      data-id={93}
                    >
                      <span className="bx bx-edit" />
                    </a>
                  </ul>
                </div>
                <div className="col-md-6  mt-3 mb-3">
                  <label className="form-label" htmlFor="end_date">
                    Clients
                  </label>
                  <p>
                    <span className="badge bg-primary">Not Assigned</span>
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select form-select-sm select-bg-label-warning"
                    id="statusSelect"
                    data-id={93}
                    data-original-status-id={59}
                    data-original-color-class="select-bg-label-warning"
                    data-type="task"
                  >
                    <option value={0} className="badge bg-label-danger">
                      Default
                    </option>
                    <option value={1} className="badge bg-label-primary">
                      Started
                    </option>
                    <option value={2} className="badge bg-label-info">
                      On Going
                    </option>
                    <option
                      value={59}
                      className="badge bg-label-warning"
                      selected=""
                    >
                      In Review
                    </option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="prioritySelect" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-select form-select-sm select-bg-label-secondary"
                    id="prioritySelect"
                    data-id={93}
                    data-original-priority-id=""
                    data-original-color-class="select-bg-label-secondary"
                    data-type="task"
                  >
                    <option value={0} className="badge bg-label-secondary">
                      Default
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-0" />
        <div className="card-body">
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label" htmlFor="project">
                Project
              </label>
              <div className="input-group input-group-merge">
                <input
                  className="form-control px-2"
                  type="text"
                  id="project"
                  defaultValue="EcoMarket"
                  readOnly=""
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <div className="input-group input-group-merge">
                <div className="form-control" rows={5} readOnly="">
                  <p>
                    shivazsdvesg ewggwgwet243 qtq3yrwy r3y5ytehy 4wy hteyh
                    rehwtt ggewrrrrrrrrrrggggggggggg
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="start_date">
                Starts At
              </label>
              <div className="input-group input-group-merge">
                <input
                  type="text"
                  name="start_date"
                  className="form-control"
                  placeholder=""
                  defaultValue="September 18, 2023"
                  readOnly=""
                />
              </div>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="due-date">
                Ends At
              </label>
              <div className="input-group input-group-merge">
                <input
                  className="form-control"
                  type="text"
                  name="due_date"
                  placeholder=""
                  defaultValue="July 05, 2024"
                  readOnly=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" id="media_type_id" defaultValue={93} />
    </div>
    <div className="nav-align-top mt-2">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <button
            type="button"
            className="nav-link active"
            role="tab"
            data-bs-toggle="tab"
            data-bs-target="#navs-top-media"
            aria-controls="navs-top-media"
          >
            <i className="menu-icon tf-icons bx bx-image-alt text-success" />
            Media{" "}
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            role="tab"
            data-bs-toggle="tab"
            data-bs-target="#navs-top-activity-log"
            aria-controls="navs-top-activity-log"
          >
            <i className="menu-icon tf-icons bx bx-line-chart text-info" />
            Activity Log{" "}
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="navs-top-media"
          role="tabpanel"
        >
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div />
              <a
                href="javascript:void(0);"
                data-bs-toggle="modal"
                data-bs-target="#add_media_modal"
              >
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="Add Media"
                >
                  <i className="bx bx-plus" />
                </button>
              </a>
            </div>
            <div className="table-responsive text-nowrap">
              <input type="hidden" id="data_type" defaultValue="task-media" />
              <input
                type="hidden"
                id="data_table"
                defaultValue="task_media_table"
              />
              <input type="hidden" id="save_column_visibility" />
              <table
                id="task_media_table"
                data-toggle="table"
                data-loading-template="loadingTemplate"
                data-url="https://taskify.taskhub.company/tasks/get-media/93"
                data-icons-prefix="bx"
                data-icons="icons"
                data-show-refresh="true"
                data-total-field="total"
                data-trim-on-search="false"
                data-data-field="rows"
                data-page-list="[5, 10, 20, 50, 100, 200]"
                data-search="true"
                data-side-pagination="server"
                data-show-columns="true"
                data-pagination="true"
                data-sort-name="id"
                data-sort-order="desc"
                data-mobile-responsive="true"
                data-query-params="queryParamsTaskMedia"
              >
                <thead>
                  <tr>
                    <th data-checkbox="true" />
                    <th
                      data-field="id"
                      data-visible="true"
                      data-sortable="true"
                    >
                      ID
                    </th>
                    <th
                      data-field="file"
                      data-visible="true"
                      data-sortable="true"
                    >
                      File
                    </th>
                    <th
                      data-field="file_name"
                      data-sortable="true"
                      data-visible="false"
                    >
                      File Name
                    </th>
                    <th
                      data-field="file_size"
                      data-visible="true"
                      data-sortable="true"
                    >
                      File Size
                    </th>
                    <th
                      data-field="created_at"
                      data-sortable="true"
                      data-visible="false"
                    >
                      Created At
                    </th>
                    <th
                      data-field="updated_at"
                      data-sortable="true"
                      data-visible="false"
                    >
                      Updated At
                    </th>
                    <th
                      data-field="actions"
                      data-visible="true"
                      data-sortable="false"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="navs-top-activity-log"
          role="tabpanel"
        >
          <div className="col-12">
            <div className="row mt-4">
              <div className="mb-3 col-md-4">
                <div className="input-group input-group-merge">
                  <input
                    type="text"
                    id="activity_log_between_date"
                    className="form-control"
                    placeholder="Date Between"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  id="user_filter"
                  aria-label="Default select example"
                >
                  <option value="">Select User</option>
                  <option value={7}>Admin Infinitie</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  id="client_filter"
                  aria-label="Default select example"
                >
                  <option value="">Select Client</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  id="activity_filter"
                  aria-label="Default select example"
                >
                  <option value="">Select Activity</option>
                  <option value="created">Created</option>
                  <option value="updated">Updated</option>
                  <option value="duplicated">Duplicated</option>
                  <option value="uploaded">Uploaded</option>
                  <option value="deleted">Deleted</option>
                </select>
              </div>
            </div>
            <div className="table-responsive text-nowrap">
              <input type="hidden" id="activity_log_between_date_from" />
              <input type="hidden" id="activity_log_between_date_to" />
              <input type="hidden" id="data_type" defaultValue="activity-log" />
              <input
                type="hidden"
                id="data_table"
                defaultValue="activity_log_table"
              />
              <input type="hidden" id="type_id" defaultValue={93} />
              <input type="hidden" id="save_column_visibility" />
              <table
                id="activity_log_table"
                data-toggle="table"
                data-loading-template="loadingTemplate"
                data-url="https://taskify.taskhub.company/activity-log/list"
                data-icons-prefix="bx"
                data-icons="icons"
                data-show-refresh="true"
                data-total-field="total"
                data-trim-on-search="false"
                data-data-field="rows"
                data-page-list="[5, 10, 20, 50, 100, 200]"
                data-search="true"
                data-side-pagination="server"
                data-show-columns="true"
                data-pagination="true"
                data-sort-name="id"
                data-sort-order="desc"
                data-mobile-responsive="true"
                data-query-params="queryParams"
              >
                <thead>
                  <tr>
                    <th data-checkbox="true" />
                    <th
                      data-field="id"
                      data-visible="true"
                      data-sortable="true"
                    >
                      ID
                    </th>
                    <th
                      data-field="actor_id"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Actor ID
                    </th>
                    <th
                      data-field="actor_name"
                      data-visible="true"
                      data-sortable="true"
                    >
                      Actor Name
                    </th>
                    <th
                      data-field="actor_type"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Actor Type
                    </th>
                    <th
                      data-field="type_id"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Type ID
                    </th>
                    <th
                      data-field="parent_type_id"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Parent Type ID
                    </th>
                    <th
                      data-field="activity"
                      data-visible="true"
                      data-sortable="true"
                    >
                      Activity
                    </th>
                    <th
                      data-field="type"
                      data-visible="true"
                      data-sortable="true"
                    >
                      Type
                    </th>
                    <th
                      data-field="parent_type"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Parent Type
                    </th>
                    <th
                      data-field="type_title"
                      data-visible="true"
                      data-sortable="true"
                    >
                      Type Title
                    </th>
                    <th
                      data-field="parent_type_title"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Parent Type Title
                    </th>
                    <th
                      data-field="message"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Message
                    </th>
                    <th
                      data-field="created_at"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Created At
                    </th>
                    <th
                      data-field="updated_at"
                      data-visible="false"
                      data-sortable="true"
                    >
                      Updated At
                    </th>
                    <th data-field="actions" data-visible="true">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="add_media_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <form
          className="modal-content form-horizontal"
          id="media-upload"
          action="https://taskify.taskhub.company/tasks/upload-media"
          method="POST"
          encType="multipart/form-data"
        >
          <input
            type="hidden"
            name="_token"
            defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
            autoComplete="off"
          />{" "}
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Add Media
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="alert alert-primary alert-dismissible" role="alert">
              Storage Type Set as Local Storage,{" "}
              <a
                href="https://taskify.taskhub.company/settings/media-storage"
                target="_blank"
              >
                Click Here to Change
              </a>
            </div>
            <div
              className="dropzone dz-clickable"
              id="media-upload-dropzone"
            ></div>
            <div className="form-group mt-4 text-center">
              <button className="btn btn-primary" id="upload_media_btn">
                Upload
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <div className="form-group" id="error_box"></div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="create_status_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <form
        className="modal-content form-submit-event"
        action="https://taskify.taskhub.company/status/store"
        method="POST"
      >
        <input type="hidden" name="dnr" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Create Status
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <input
          type="hidden"
          name="_token"
          defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
          autoComplete="off"
        />{" "}
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Title <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                id="nameBasic"
                className="form-control"
                name="title"
                placeholder="Please Enter Title"
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Color <span className="asterisk">*</span>
              </label>
              <select
                className="form-select select-bg-label-primary"
                id="color"
                name="color"
              >
                <option className="badge bg-label-primary" value="primary">
                  Primary{" "}
                </option>
                <option className="badge bg-label-secondary" value="secondary">
                  Secondary
                </option>
                <option className="badge bg-label-success" value="success">
                  Success
                </option>
                <option className="badge bg-label-danger" value="danger">
                  Danger
                </option>
                <option className="badge bg-label-warning" value="warning">
                  Warning
                </option>
                <option className="badge bg-label-info" value="info">
                  Info
                </option>
                <option className="badge bg-label-dark" value="dark">
                  Dark
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label">
                Roles Can Update the Status{" "}
                <i
                  className="bx bx-info-circle text-primary"
                  data-bs-toggle="tooltip"
                  data-bs-offset="0,4"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Including Admin and Roles with All Data Access Permission, Users/Clients Under Selected Role(s) Will Have Permission to Set This Status."
                />
              </label>
              <select
                className="form-control js-example-basic-multiple"
                name="role_ids[]"
                multiple="multiple"
                data-placeholder="Type to Search"
              >
                <option value={9}>Member</option>
                <option value={18}>客户</option>
                <option value={21}>Gerente</option>
                <option value={22}>Developer</option>
                <option value={23}>Admin one</option>
                <option value={24}>Product manager</option>
                <option value={25}>Gong</option>
                <option value={26}>SIS</option>
                <option value={27}>Test</option>
                <option value={28}>Templatedata</option>
                <option value={29}>Test12</option>
                <option value={30}>Test_role</option>
                <option value={31}>User</option>
                <option value={32}>Test test role</option>
                <option value={33}>Test123</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary" id="submit_btn">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="create_priority_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <form
        className="modal-content form-submit-event"
        action="https://taskify.taskhub.company/priority/store"
        method="POST"
      >
        <input type="hidden" name="dnr" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Create priority
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <input
          type="hidden"
          name="_token"
          defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
          autoComplete="off"
        />{" "}
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Title <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                id="nameBasic"
                className="form-control"
                name="title"
                placeholder="Please Enter Title"
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Color <span className="asterisk">*</span>
              </label>
              <select
                className="form-select select-bg-label-primary"
                id="color"
                name="color"
              >
                <option className="badge bg-label-primary" value="primary">
                  Primary{" "}
                </option>
                <option className="badge bg-label-secondary" value="secondary">
                  Secondary
                </option>
                <option className="badge bg-label-success" value="success">
                  Success
                </option>
                <option className="badge bg-label-danger" value="danger">
                  Danger
                </option>
                <option className="badge bg-label-warning" value="warning">
                  Warning
                </option>
                <option className="badge bg-label-info" value="info">
                  Info
                </option>
                <option className="badge bg-label-dark" value="dark">
                  Dark
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary" id="submit_btn">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="default_language_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Want to Set As Your Primary Language?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" className="btn btn-primary" id="confirm">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="set_default_view_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Want to Set as Default View?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" className="btn btn-primary" id="confirm">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="confirmSaveColumnVisibility"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Want to Save Column Visibility?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" className="btn btn-primary" id="confirm">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="leaveWorkspaceModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Warning
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          Are You Sure You Want Leave This Workspace?{" "}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" className="btn btn-danger" id="confirm">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="create_language_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <form
        className="modal-content form-submit-event"
        action="https://taskify.taskhub.company/settings/languages/store"
        method="POST"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Create Language
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <input
          type="hidden"
          name="_token"
          defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
          autoComplete="off"
        />{" "}
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Title <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="For Example: English"
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Code <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="For Example: en"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" id="submit_btn" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="edit_language_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <form
        className="modal-content form-submit-event"
        action="https://taskify.taskhub.company/settings/languages/update"
        method="POST"
      >
        <input type="hidden" name="id" id="language_id" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Update Language
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <input
          type="hidden"
          name="_token"
          defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
          autoComplete="off"
        />{" "}
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Title <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="language_title"
                placeholder="For Example: English"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" id="submit_btn" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="create_contract_type_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <form
        className="modal-content form-submit-event"
        action="https://taskify.taskhub.company/contracts/store-contract-type"
        method="POST"
      >
        <input type="hidden" name="dnr" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Create Contract Type
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Type <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="type"
                placeholder="Please Enter Contract Type"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" id="submit_btn" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="edit_contract_type_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <form
        className="modal-content form-submit-event"
        action="https://taskify.taskhub.company/contracts/update-contract-type"
        method="POST"
      >
        <input type="hidden" name="dnr" />
        <input type="hidden" id="update_contract_type_id" name="id" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Update Contract Type
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nameBasic" className="form-label">
                Type <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="type"
                id="contract_type"
                placeholder="Please Enter Contract Type"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" id="submit_btn" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="deleteAccountModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Warning
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Sure You Want to Delete Your Account?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <form
            id="formAccountDeactivation"
            action="https://taskify.taskhub.company/account/destroy/7"
            method="POST"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
              autoComplete="off"
            />{" "}
            <input type="hidden" name="_method" defaultValue="DELETE" />{" "}
            <button type="submit" className="btn btn-danger">
              Yes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="deleteModal" tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel2">
            Warning
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {" "}
            '
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" className="btn btn-danger" id="confirmDelete">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="confirmDeleteSelectedModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel2">
            Warning
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {" "}
            '
          </button>
        </div>
        <div className="modal-body">
          <p>Are You Sure You Want to Delete Selected Record(s)?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            id="confirmDeleteSelections"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="duplicateModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Warning
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Sure You Want to Duplicate?</p>
          <div id="titleDiv" className="d-none">
            <label className="form-label">Update Title</label>
            <input
              type="text"
              className="form-control"
              id="updateTitle"
              placeholder="Enter Title For Item Being Duplicated"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="confirmDuplicate"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="timerModal" tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Time Tracker
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="stopwatch">
            <div className="stopwatch_time">
              <input
                type="text"
                name="hour"
                id="hour"
                className="form-control stopwatch_time_input"
                readOnly=""
              />
              <div className="stopwatch_time_lable">Hours</div>
            </div>
            <div className="stopwatch_time">
              <input
                type="text"
                name="minute"
                id="minute"
                className="form-control stopwatch_time_input"
                readOnly=""
              />
              <div className="stopwatch_time_lable">Minutes</div>
            </div>
            <div className="stopwatch_time">
              <input
                type="text"
                name="second"
                id="second"
                className="form-control stopwatch_time_input"
                readOnly=""
              />
              <div className="stopwatch_time_lable">Second</div>
            </div>
          </div>
          <div className="selectgroup selectgroup-pills d-flex justify-content-around mt-3">
            <label className="selectgroup-item">
              <span
                className="selectgroup-button selectgroup-button-icon"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-original-title="Start"
                id="start"
                onclick="startTimer()"
              >
                <i className="bx bx-play" />
              </span>
            </label>
            <label className="selectgroup-item">
              <span
                className="selectgroup-button selectgroup-button-icon"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-original-title="Stop"
                id="end"
                onclick="stopTimer()"
              >
                <i className="bx bx-stop" />
              </span>
            </label>
            <label className="selectgroup-item">
              <span
                className="selectgroup-button selectgroup-button-icon"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-original-title="Pause"
                id="pause"
                onclick="pauseTimer()"
              >
                <i className="bx bx-pause" />
              </span>
            </label>
          </div>
          <div className="form-group mb-0 mt-3">
            <label className="label">Message:</label>
            <textarea
              className="form-control"
              id="time_tracker_message"
              placeholder="Please Enter Your Message"
              name="message"
              defaultValue={""}
            />
          </div>
          <div className="modal-footer justify-content-center">
            <a
              href="https://taskify.taskhub.company/time-tracker"
              className="btn btn-primary"
            >
              <i className="bx bxs-time" /> View Timesheet
            </a>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="stopTimerModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel2">
            Warning
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {" "}
            '
          </button>
        </div>
        <div className="modal-body">
          <p>Are You Sure You Want to Stop the Timer?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" className="btn btn-danger" id="confirmStop">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="mark_all_notifications_as_read_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Sure You Want to Mark All Notifications as Read?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="confirmMarkAllAsRead"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="update_notification_status_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are You Sure You Want to Update Notification Status?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="confirmNotificationStatus"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="restore_default_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are you sure you want to restore default template?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="confirmRestoreDefault"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="sms_instuction_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Sms Gateway Configuration
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <ul>
            <li>
              Read and follow instructions carefully while configuration sms
              gateway setting{" "}
            </li>
            <li className="my-4">
              Firstly open your sms gateway account . You can find api keys in
              your account -&gt; API keys &amp; credentials -&gt; create api key{" "}
            </li>
            <li className="my-4">
              After create key you can see here Account sid and auth token{" "}
            </li>
            <div className="simplelightbox-gallery">
              <a
                href="https://taskify.taskhub.company/storage/images/base_url_and_params.png"
                target="_blank"
              >
                <img
                  src="https://taskify.taskhub.company/storage/images/base_url_and_params.png"
                  className="w-100"
                />
              </a>
            </div>
            <li className="my-4">For Base url Messaging -&gt; Send an SMS</li>
            <div className="simplelightbox-gallery">
              <a
                href="https://taskify.taskhub.company/storage/images/api_key_and_token.png"
                target="_blank"
              >
                <img
                  src="https://taskify.taskhub.company/storage/images/api_key_and_token.png"
                  className="w-100"
                />
              </a>
            </div>
            <li className="my-4">check this for admin panel settings</li>
            <div className="simplelightbox-gallery">
              <a
                href="https://taskify.taskhub.company/storage/images/sms_gateway_1.png"
                target="_blank"
              >
                <img
                  src="https://taskify.taskhub.company/storage/images/sms_gateway_1.png"
                  className="w-100"
                />
              </a>
            </div>
            <div className="simplelightbox-gallery">
              <a
                href="https://taskify.taskhub.company/storage/images/sms_gateway_2.png"
                target="_blank"
              >
                <img
                  src="https://taskify.taskhub.company/storage/images/sms_gateway_2.png"
                  className="w-100"
                />
              </a>
            </div>
            <li className="my-4">
              <b>
                Make sure you entered valid data as per instructions before
                proceed
              </b>
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="whatsapp_instuction_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            WhatsApp Configuration
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <ul>
            <li className="mb-2">
              You can find your <b>Account SID</b> and <b>Auth Token</b> on the
              Twilio Console dashboard page.
            </li>
            <li className="mb-2">
              <b>From Number:</b> To get a test <b>From Number</b>, log in to
              your Twilio Console and go to{" "}
              <b>Messaging &gt; Try it out &gt; Send a WhatsApp message</b> and
              follow the instructions. If you want to use <b>your own number</b>{" "}
              as the <b>From Number</b>, go to{" "}
              <b>Messaging &gt; Senders &gt; WhatsApp senders</b> and follow the
              instructions.
            </li>
            <li className="mb-2">
              <b>
                Feel free to reach out to us if you encounter any difficulties.
              </b>
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="permission_instuction_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Permission Settings Instructions
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <ul>
            <li className="mb-2">
              <b>All Data Access:</b> If this option is selected, users or
              clients assigned to this role will have unrestricted access to all
              data, without any specific restrictions or limitations.
            </li>
            <li className="mb-2">
              <b>Allocated Data Access:</b> If this option is selected, users or
              clients assigned to this role will have restricted access to data
              based on specific assignments and restrictions.
            </li>
            <li className="mb-2">
              <b>Create Permission:</b> This determines whether users or clients
              assigned to this role can create new records. For example, if the
              create permission is enabled for projects, users or clients in
              this role will be able to create new projects; otherwise, they
              won’t have this ability.
            </li>
            <li className="mb-2">
              <b>Manage Permission:</b> This determines whether users or clients
              assigned to this role can access and interact with specific
              modules. For instance, if the manage permission is enabled for
              projects, users or clients in this role will be able to view
              projects however create, edit, or delete depending on the specific
              permissions granted. If the manage permission is disabled for
              projects, users or clients in this role won’t be able to view or
              interact with projects in any way.
            </li>
            <li className="mb-2">
              <b>Edit Permission:</b> This determines whether users or clients
              assigned to this role can edit current records. For example, if
              the edit permission is enabled for projects, users or clients in
              this role will be able to edit current projects; otherwise, they
              won’t have this ability.
            </li>
            <li>
              <b>Delete Permission:</b> This determines whether users or clients
              assigned to this role can delete current records. For example, if
              the delete permission is enabled for projects, users or clients in
              this role will be able to delete current projects; otherwise, they
              won’t have this ability.
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="edit_task_modal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <form
        action="https://taskify.taskhub.company/tasks/update"
        className="form-submit-event modal-content"
        method="POST"
      >
        <input type="hidden" name="id" id="id" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
            Update Task
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <input
          type="hidden"
          name="_token"
          defaultValue="mjY6CWEM4fgAXoUMUntHbwTeIN04KUkWJAwSo68z"
          autoComplete="off"
        />{" "}
        <div className="modal-body">
          <div className="row">
            <div className="mb-3 col-md-12">
              <label htmlFor="title" className="form-label">
                Title <span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Please Enter Title"
                defaultValue=""
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="status">
                Status <span className="asterisk">*</span>
              </label>
              <select
                className="form-select statusDropdown"
                name="status_id"
                id="task_status_id"
              >
                <option value={0} data-color="danger" selected="">
                  Default (danger)
                </option>
                <option value={1} data-color="primary">
                  Started (primary)
                </option>
                <option value={2} data-color="info">
                  On Going (info)
                </option>
                <option value={59} data-color="warning">
                  In Review (warning)
                </option>
              </select>
              <div className="mt-2">
                <a href="javascript:void(0);" className="openCreateStatusModal">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title=" Create Status"
                  >
                    <i className="bx bx-plus" />
                  </button>
                </a>
                <a
                  href="https://taskify.taskhub.company/status/manage"
                  target="_blank"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Manage Statuses"
                  >
                    <i className="bx bx-list-ul" />
                  </button>
                </a>
              </div>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Priority</label>
              <select
                className="form-select bg-label-secondary"
                name="priority_id"
                id="priority_id"
              >
                <option
                  value={0}
                  className="badge bg-label-secondary"
                  selected=""
                >
                  Default (secondary)
                </option>
              </select>
              <div className="mt-2">
                <a
                  href="javascript:void(0);"
                  className="openCreatePriorityModal"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title=" Create priority"
                  >
                    <i className="bx bx-plus" />
                  </button>
                </a>
                <a
                  href="https://taskify.taskhub.company/priority/manage"
                  target="_blank"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Manage Priorities"
                  >
                    <i className="bx bx-list-ul" />
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-12">
              <label htmlFor="project_title" className="form-label">
                Project <span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="update_project_title"
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label className="form-label" htmlFor="user_id">
                Select Users{" "}
                <span id="task_update_users_associated_with_project" />
              </label>
              <select
                className="form-control js-example-basic-multiple"
                name="user_id[]"
                multiple="multiple"
                data-placeholder="Type to Search"
              ></select>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="start_date">
                Starts At
              </label>
              <input
                type="text"
                id="update_start_date"
                name="start_date"
                className="form-control"
                placeholder="Please Select"
                autoComplete="off"
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label" htmlFor="due_date">
                Ends At
              </label>
              <input
                type="text"
                id="update_end_date"
                name="due_date"
                className="form-control"
                placeholder="Please Select"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control description"
                id="task_description"
                rows={5}
                name="description"
                placeholder="Please Enter Description"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label className="form-label">Note</label>
              <textarea
                className="form-control"
                name="note"
                rows={3}
                id="taskNote"
                placeholder="Optional Note"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button type="submit" id="submit_btn" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    className="modal fade"
    id="confirmUpdateStatusModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Do You Want to Update the Status?</p>
          <textarea
            className="form-control"
            id="statusNote"
            placeholder="Optional Note"
            defaultValue={""}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            id="declineUpdateStatus"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="confirmUpdateStatus"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="confirmUpdatePriorityModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" id="exampleModalLabel2">
            Confirm!
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Do You Want to Update the Priority?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            id="declineUpdatePriority"
            data-bs-dismiss="modal"
          >
            Close{" "}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="confirmUpdatePriority"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="createWorkspaceModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create Workspace</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <form
          action="https://taskify.taskhub.company/workspaces/store"
          className="form-submit-event"
          method="POST"
        >
          <input type="hidden" name="dnr" />
          <div className="modal-body">
            <div className="row">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title <span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Please Enter Title"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label className="form-label" htmlFor="user_ids[]">
                  Select Users
                </label>
                <select
                  className="form-control js-example-basic-multiple"
                  name="user_ids[]"
                  multiple="multiple"
                  data-placeholder="Type to Search"
                >
                  <option value={7} selected="">
                    Admin Infinitie
                  </option>
                  <option value={76}>Memeber2 Infinitie</option>
                  <option value={77}>Member Infinitie</option>
                  <option value={79}>dummy one</option>
                  <option value={80}>ABC PQR</option>
                  <option value={81}>Elara Bishop</option>
                  <option value={82}>Orion Caldwell</option>
                  <option value={96}>Zenith Hayes</option>
                  <option value={103}>Fig manager</option>
                  <option value={104}>Prachi Patil</option>
                  <option value={105}>xxx xxx</option>
                  <option value={107}>Houssam Test</option>
                  <option value={108}>KEMAL OZ</option>
                  <option value={109}>бабораб gfhf</option>
                  <option value={110}>da ad</option>
                  <option value={111}>asdf asd</option>
                  <option value={112}>Pera Peric</option>
                  <option value={113}>Issam Sardar</option>
                  <option value={114}>Issam Sardar</option>
                  <option value={115}>fgbfgfgfgfgffg Solanki</option>
                  <option value={116}>Puspendu Patra</option>
                  <option value={117}>sdafas weareawfasd</option>
                  <option value={118}>Mahmoud Basheer</option>
                  <option value={119}>Uzzal Admin</option>
                  <option value={120}>Uzzal User</option>
                  <option value={121}>yesq nouy</option>
                  <option value={122}>Charlton White</option>
                  <option value={123}>test test 2</option>
                  <option value={124}>Test test</option>
                  <option value={125}>Oluseun Temiye</option>
                  <option value={126}>Oluseun Temiye</option>
                  <option value={127}>JAMES1 BELLO</option>
                  <option value={130}>HAKAN YOK</option>
                  <option value={131}>rabbil hasan</option>
                  <option value={132}>babu Khan</option>
                  <option value={133}>Arshad Equbal</option>
                  <option value={139}>Yomor mor</option>
                  <option value={140}>Yomo more</option>
                  <option value={141}>Yomoadmin admin</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label className="form-label" htmlFor="client_ids[]">
                  Select Clients
                </label>
                <select
                  className="form-control js-example-basic-multiple"
                  name="client_ids[]"
                  multiple="multiple"
                  data-placeholder="Type to Search"
                >
                  <option value={66}>client Two</option>
                  <option value={78}>Client One</option>
                  <option value={79}>saifullah muhamad</option>
                  <option value={80}>Nithin Viswanathan</option>
                  <option value={81}>Kellan Ashford</option>
                  <option value={82}>wdwdw wdwddw</option>
                  <option value={83}>wdwdwasacs wdwdwasacs</option>
                  <option value={85}>Tatiana Pogrebetskaya</option>
                  <option value={86}>Johnathan Doe</option>
                  <option value={87}>Shiva Prasad</option>
                  <option value={88}>Dhananjay User</option>
                  <option value={89}>rehtr drghf</option>
                  <option value={90}>Sanjay Soni</option>
                  <option value={91}>Diego Mau</option>
                  <option value={92}>Dejan cl Gest</option>
                  <option value={93}>hgfh hfh</option>
                  <option value={94}>Md Aynal Haque</option>
                  <option value={95}>test vpn</option>
                  <option value={96}>Blaine Kane</option>
                  <option value={97}>GAF CLIENT CLIENT</option>
                  <option value={98}>test test</option>
                  <option value={99}>Mahmoud Galal</option>
                  <option value={100}>Micle Lion</option>
                  <option value={101}>CLIENT AADDED</option>
                  <option value={102}>sd dd</option>
                  <option value={103}>Kola ross</option>
                  <option value={104}>Ryder Share</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <div className="form-check form-switch">
                  <label
                    className="form-check-label"
                    htmlFor="primaryWorkspace"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="primaryWorkspace"
                      id="primaryWorkspace"
                    />
                    Primary Workspace?
                  </label>
                </div>
              </div>
            </div>
            <div className="alert alert-primary alert-dismissible" role="alert">
              You Will Be Workspace Participant Automatically{" "}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" id="submit_btn" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="editWorkspaceModal"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Workspace</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <form
          action="https://taskify.taskhub.company/workspaces/update"
          className="form-submit-event"
          method="POST"
        >
          <input type="hidden" name="id" id="workspace_id" />
          <input type="hidden" name="dnr" />
          <div className="modal-body">
            <div className="row">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title <span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  id="workspace_title"
                  placeholder="Please Enter Title"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label className="form-label" htmlFor="user_ids[]">
                  Select Users
                </label>
                <select
                  className="form-control js-example-basic-multiple"
                  name="user_ids[]"
                  multiple="multiple"
                  data-placeholder="Type to Search"
                >
                  <option value={7} selected="">
                    Admin Infinitie
                  </option>
                  <option value={76}>Memeber2 Infinitie</option>
                  <option value={77}>Member Infinitie</option>
                  <option value={79}>dummy one</option>
                  <option value={80}>ABC PQR</option>
                  <option value={81}>Elara Bishop</option>
                  <option value={82}>Orion Caldwell</option>
                  <option value={96}>Zenith Hayes</option>
                  <option value={103}>Fig manager</option>
                  <option value={104}>Prachi Patil</option>
                  <option value={105}>xxx xxx</option>
                  <option value={107}>Houssam Test</option>
                  <option value={108}>KEMAL OZ</option>
                  <option value={109}>бабораб gfhf</option>
                  <option value={110}>da ad</option>
                  <option value={111}>asdf asd</option>
                  <option value={112}>Pera Peric</option>
                  <option value={113}>Issam Sardar</option>
                  <option value={114}>Issam Sardar</option>
                  <option value={115}>fgbfgfgfgfgffg Solanki</option>
                  <option value={116}>Puspendu Patra</option>
                  <option value={117}>sdafas weareawfasd</option>
                  <option value={118}>Mahmoud Basheer</option>
                  <option value={119}>Uzzal Admin</option>
                  <option value={120}>Uzzal User</option>
                  <option value={121}>yesq nouy</option>
                  <option value={122}>Charlton White</option>
                  <option value={123}>test test 2</option>
                  <option value={124}>Test test</option>
                  <option value={125}>Oluseun Temiye</option>
                  <option value={126}>Oluseun Temiye</option>
                  <option value={127}>JAMES1 BELLO</option>
                  <option value={130}>HAKAN YOK</option>
                  <option value={131}>rabbil hasan</option>
                  <option value={132}>babu Khan</option>
                  <option value={133}>Arshad Equbal</option>
                  <option value={139}>Yomor mor</option>
                  <option value={140}>Yomo more</option>
                  <option value={141}>Yomoadmin admin</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label className="form-label" htmlFor="client_ids[]">
                  Select Clients
                </label>
                <select
                  className="form-control js-example-basic-multiple"
                  name="client_ids[]"
                  multiple="multiple"
                  data-placeholder="Type to Search"
                >
                  <option value={66}>client Two</option>
                  <option value={78}>Client One</option>
                  <option value={79}>saifullah muhamad</option>
                  <option value={80}>Nithin Viswanathan</option>
                  <option value={81}>Kellan Ashford</option>
                  <option value={82}>wdwdw wdwddw</option>
                  <option value={83}>wdwdwasacs wdwdwasacs</option>
                  <option value={85}>Tatiana Pogrebetskaya</option>
                  <option value={86}>Johnathan Doe</option>
                  <option value={87}>Shiva Prasad</option>
                  <option value={88}>Dhananjay User</option>
                  <option value={89}>rehtr drghf</option>
                  <option value={90}>Sanjay Soni</option>
                  <option value={91}>Diego Mau</option>
                  <option value={92}>Dejan cl Gest</option>
                  <option value={93}>hgfh hfh</option>
                  <option value={94}>Md Aynal Haque</option>
                  <option value={95}>test vpn</option>
                  <option value={96}>Blaine Kane</option>
                  <option value={97}>GAF CLIENT CLIENT</option>
                  <option value={98}>test test</option>
                  <option value={99}>Mahmoud Galal</option>
                  <option value={100}>Micle Lion</option>
                  <option value={101}>CLIENT AADDED</option>
                  <option value={102}>sd dd</option>
                  <option value={103}>Kola ross</option>
                  <option value={104}>Ryder Share</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <div className="form-check form-switch">
                  <label
                    className="form-check-label"
                    htmlFor="updatePrimaryWorkspace"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="primaryWorkspace"
                      id="updatePrimaryWorkspace"
                    />
                    Primary Workspace?
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" id="submit_btn" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
   
  
  )
}

export default TaskById
