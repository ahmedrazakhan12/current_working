import React from 'react'
import { Link } from 'react-router-dom'

const tag = () => {
  return (
    <div>
      <div className="content-wrapper">
  <div className="container-fluid">
    <div className="d-flex justify-content-between mb-2 mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style1">
            <li className="breadcrumb-item">
               <Link to={'/'}>
              Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">
              <a href="../assets/projects">
                Projects
              </a>
            </li>
            <li className="breadcrumb-item active">
              Tags
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <a
          data-bs-target="#create_tag_modal"
          data-bs-toggle="modal"
          href="javascript:void(0);"
        >
          <button
            className="btn btn-sm btn-primary"
            data-bs-original-title=" Create Tag"
            data-bs-placement="right"
            data-bs-toggle="tooltip"
            type="button"
          >
            <i className="bx bx-plus" />
          </button>
        </a>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <div className="table-responsive text-nowrap">
          <input
            defaultValue="tags"
            id="data_type"
            type="hidden"
          />
          <table
            data-data-field="rows"
            data-icons="icons"
            data-icons-prefix="bx"
            data-loading-template="loadingTemplate"
            data-mobile-responsive="true"
            data-page-list="[5, 10, 20, 50, 100, 200]"
            data-pagination="true"
            data-query-params="queryParams"
            data-search="true"
            data-show-columns="true"
            data-show-refresh="true"
            data-side-pagination="server"
            data-sort-name="id"
            data-sort-order="desc"
            data-toggle="table"
            data-total-field="total"
            data-trim-on-search="false"
            data-url="/tags/list"
            id="table"
          >
            <thead>
              <tr>
                <th data-checkbox="true" />
                <th
                  data-field="id"
                  data-sortable="true"
                >
                  ID
                </th>
                <th
                  data-field="title"
                  data-sortable="true"
                >
                  Title
                </th>
                <th
                  data-field="color"
                  data-sortable="true"
                >
                  Preview
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
                <th data-formatter="actionsFormatter">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
  <script
    dangerouslySetInnerHTML={{
      __html: '    var label_update = \'Update\';    var label_delete = \'Delete\';'
    }}
   />
  <script src="../assets/assets/js/pages/tags.js" />
  <div
    aria-hidden="true"
    className="modal fade"
    id="create_tag_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-md"
      role="document"
    >
      <form
        action="../assets/tags/store"
        className="modal-content form-submit-event"
        method="POST"
      >
        <input
          name="dnr"
          type="hidden"
        />
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Create Tag
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <input
          autoComplete="off"
          defaultValue="oXBOn727wgv062O0zra9PaMnxV1wkPxLTZtX2knQ"
          name="_token"
          type="hidden"
        />
        <div className="modal-body">
          <div className="row">
            <div className="col-12 mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Title{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                id="nameBasic"
                name="title"
                placeholder="Please Enter Title"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Color{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <select
                className="form-select select-bg-label-primary"
                id="color"
                name="color"
              >
                <option
                  className="badge bg-label-primary"
                  value="primary"
                >
                  Primary
                </option>
                <option
                  className="badge bg-label-secondary"
                  value="secondary"
                >
                  Secondary
                </option>
                <option
                  className="badge bg-label-success"
                  value="success"
                >
                  Success
                </option>
                <option
                  className="badge bg-label-danger"
                  value="danger"
                >
                  Danger
                </option>
                <option
                  className="badge bg-label-warning"
                  value="warning"
                >
                  Warning
                </option>
                <option
                  className="badge bg-label-info"
                  value="info"
                >
                  Info
                </option>
                <option
                  className="badge bg-label-dark"
                  value="dark"
                >
                  Dark
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="submit_btn"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="edit_tag_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-md"
      role="document"
    >
      <form
        action="/tags/update"
        className="modal-content form-submit-event"
        method="POST"
      >
        <input
          name="dnr"
          type="hidden"
        />
        <input
          id="tag_id"
          name="id"
          type="hidden"
        />
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Update Tag
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <input
          autoComplete="off"
          defaultValue="oXBOn727wgv062O0zra9PaMnxV1wkPxLTZtX2knQ"
          name="_token"
          type="hidden"
        />
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Title{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                id="tag_title"
                name="title"
                placeholder="Please Enter Title"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Color{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <select
                className="form-select select-bg-label-primary"
                id="tag_color"
                name="color"
              >
                <option
                  className="badge bg-label-primary"
                  value="primary"
                >
                  Primary
                </option>
                <option
                  className="badge bg-label-secondary"
                  value="secondary"
                >
                  Secondary
                </option>
                <option
                  className="badge bg-label-success"
                  value="success"
                >
                  Success
                </option>
                <option
                  className="badge bg-label-danger"
                  value="danger"
                >
                  Danger
                </option>
                <option
                  className="badge bg-label-warning"
                  value="warning"
                >
                  Warning
                </option>
                <option
                  className="badge bg-label-info"
                  value="info"
                >
                  Info
                </option>
                <option
                  className="badge bg-label-dark"
                  value="dark"
                >
                  Dark
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="submit_btn"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="default_language_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Want to Set As Your Primary Language?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirm"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="set_default_view_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Want to Set as Default View?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirm"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="confirmSaveColumnVisibility"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Want to Save Column Visibility?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirm"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="leaveWorkspaceModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Warning
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          Are You Sure You Want Leave This Workspace?
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-danger"
            id="confirm"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="create_language_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <form
        action="../assets/settings/languages/store"
        className="modal-content form-submit-event"
        method="POST"
      >
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Create Language
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <input
          autoComplete="off"
          defaultValue="oXBOn727wgv062O0zra9PaMnxV1wkPxLTZtX2knQ"
          name="_token"
          type="hidden"
        />
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Title{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                name="name"
                placeholder="For Example: English"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Code{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                name="code"
                placeholder="For Example: en"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="submit_btn"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="edit_language_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <form
        action="../assets/settings/languages/update"
        className="modal-content form-submit-event"
        method="POST"
      >
        <input
          id="language_id"
          name="id"
          type="hidden"
        />
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Update Language
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <input
          autoComplete="off"
          defaultValue="oXBOn727wgv062O0zra9PaMnxV1wkPxLTZtX2knQ"
          name="_token"
          type="hidden"
        />
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Title{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                id="language_title"
                name="name"
                placeholder="For Example: English"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="submit_btn"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="create_contract_type_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <form
        action="../assets/contracts/store-contract-type"
        className="modal-content form-submit-event"
        method="POST"
      >
        <input
          name="dnr"
          type="hidden"
        />
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Create Contract Type
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Type{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                name="type"
                placeholder="Please Enter Contract Type"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="submit_btn"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="edit_contract_type_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <form
        action="../assets/contracts/update-contract-type"
        className="modal-content form-submit-event"
        method="POST"
      >
        <input
          name="dnr"
          type="hidden"
        />
        <input
          id="update_contract_type_id"
          name="id"
          type="hidden"
        />
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Update Contract Type
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col mb-3">
              <label
                className="form-label"
                htmlFor="nameBasic"
              >
                Type{' '}
                <span className="asterisk">
                  *
                </span>
              </label>
              <input
                className="form-control"
                id="contract_type"
                name="type"
                placeholder="Please Enter Contract Type"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="submit_btn"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="deleteAccountModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Warning
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Sure You Want to Delete Your Account?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <form
            action="/account/destroy/7"
            id="formAccountDeactivation"
            method="POST"
          >
            <input
              autoComplete="off"
              defaultValue="oXBOn727wgv062O0zra9PaMnxV1wkPxLTZtX2knQ"
              name="_token"
              type="hidden"
            />
            <input
              defaultValue="DELETE"
              name="_method"
              type="hidden"
            />
            <button
              className="btn btn-danger"
              type="submit"
            >
              Yes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="deleteModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel2"
          >
            Warning
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          >
            {' '}'
          </button>
        </div>
        <div className="modal-body">
          <p>
            Are you sure you want to delete?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-danger"
            id="confirmDelete"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="confirmDeleteSelectedModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel2"
          >
            Warning
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          >
            {' '}'
          </button>
        </div>
        <div className="modal-body">
          <p>
            Are You Sure You Want to Delete Selected Record(s)?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-danger"
            id="confirmDeleteSelections"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="duplicateModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-md"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Warning
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Sure You Want to Duplicate?
          </p>
          <div
            className="d-none"
            id="titleDiv"
          >
            <label className="form-label">
              Update Title
            </label>
            <input
              className="form-control"
              id="updateTitle"
              placeholder="Enter Title For Item Being Duplicated"
              type="text"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirmDuplicate"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="timerModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-md"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Time Tracker
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <div className="stopwatch">
            <div className="stopwatch_time">
              <input
                className="form-control stopwatch_time_input"
                defaultValue="00"
                id="hour"
                name="hour"
                readOnly
                type="text"
              />
              <div className="stopwatch_time_lable">
                Hours
              </div>
            </div>
            <div className="stopwatch_time">
              <input
                className="form-control stopwatch_time_input"
                defaultValue="00"
                id="minute"
                name="minute"
                readOnly
                type="text"
              />
              <div className="stopwatch_time_lable">
                Minutes
              </div>
            </div>
            <div className="stopwatch_time">
              <input
                className="form-control stopwatch_time_input"
                defaultValue="00"
                id="second"
                name="second"
                readOnly
                type="text"
              />
              <div className="stopwatch_time_lable">
                Second
              </div>
            </div>
          </div>
          <div className="selectgroup selectgroup-pills d-flex justify-content-around mt-3">
            <label className="selectgroup-item">
              <span
                className="selectgroup-button selectgroup-button-icon"
                data-bs-original-title="Start"
                data-bs-placement="left"
                data-bs-toggle="tooltip"
                id="start"
                onclick="startTimer()"
              >
                <i className="bx bx-play" />
              </span>
            </label>
            <label className="selectgroup-item">
              <span
                className="selectgroup-button selectgroup-button-icon"
                data-bs-original-title="Stop"
                data-bs-placement="left"
                data-bs-toggle="tooltip"
                id="end"
                onclick="stopTimer()"
              >
                <i className="bx bx-stop" />
              </span>
            </label>
            <label className="selectgroup-item">
              <span
                className="selectgroup-button selectgroup-button-icon"
                data-bs-original-title="Pause"
                data-bs-placement="left"
                data-bs-toggle="tooltip"
                id="pause"
                onclick="pauseTimer()"
              >
                <i className="bx bx-pause" />
              </span>
            </label>
          </div>
          <div className="form-group mb-0 mt-3">
            <label className="label">
              Message:
            </label>
            <textarea
              className="form-control"
              id="time_tracker_message"
              name="message"
              placeholder="Please Enter Your Message"
            />
          </div>
          <div className="modal-footer justify-content-center">
            <a
              className="btn btn-primary"
              href="/time-tracker"
            >
              <i className="bx bxs-time" />
              {' '}View Timesheet
            </a>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="stopTimerModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel2"
          >
            Warning
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          >
            {' '}'
          </button>
        </div>
        <div className="modal-body">
          <p>
            Are You Sure You Want to Stop the Timer?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-danger"
            id="confirmStop"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="mark_all_notifications_as_read_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Sure You Want to Mark All Notifications as Read?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirmMarkAllAsRead"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="update_notification_status_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are You Sure You Want to Update Notification Status?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirmNotificationStatus"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="restore_default_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Are you sure you want to restore default template?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirmRestoreDefault"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="sms_instuction_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-lg"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Sms Gateway Configuration
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <ul>
            <li>
              Read and follow instructions carefully while configuration sms gateway setting{' '}
            </li>
            <li className="my-4">
              {`Firstly open your sms gateway account . You can find api keys in your account -> API keys & credentials -> create api key `}
            </li>
            <li className="my-4">
              After create key you can see here Account sid and auth token{' '}
            </li>
            <div className="simplelightbox-gallery">
              <a
                href="../assets/storage/images/base_url_and_params.png"
                target="_blank"
              >
                <img
                  className="w-100"
                  src="../assets/storage/images/base_url_and_params.png"
                />
              </a>
            </div>
            <li className="my-4">
              {`For Base url Messaging -> Send an SMS`}
            </li>
            <div className="simplelightbox-gallery">
              <a
                href="../assets/storage/images/api_key_and_token.png"
                target="_blank"
              >
                <img
                  className="w-100"
                  src="../assets/storage/images/api_key_and_token.png"
                />
              </a>
            </div>
            <li className="my-4">
              check this for admin panel settings
            </li>
            <div className="simplelightbox-gallery">
              <a
                href="../assets/storage/images/sms_gateway_1.png"
                target="_blank"
              >
                <img
                  className="w-100"
                  src="../assets/storage/images/sms_gateway_1.png"
                />
              </a>
            </div>
            <div className="simplelightbox-gallery">
              <a
                href="../assets/storage/images/sms_gateway_2.png"
                target="_blank"
              >
                <img
                  className="w-100"
                  src="../assets/storage/images/sms_gateway_2.png"
                />
              </a>
            </div>
            <li className="my-4">
              <b>
                Make sure you entered valid data as per instructions before proceed
              </b>
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="whatsapp_instuction_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-lg"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            WhatsApp Configuration
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <ul>
            <li className="mb-2">
              You can find your{' '}
              <b>
                Account SID
              </b>
              {' '}and{' '}
              <b>
                Auth Token
              </b>
              {' '}on the Twilio Console dashboard page.
            </li>
            <li className="mb-2">
              <b>
                From Number:
              </b>
              {' '}To get a test{' '}
              <b>
                From Number
              </b>
              , log in to your Twilio Console and go to{' '}
              <b>
                {`Messaging > Try it out > Send a WhatsApp message`}
              </b>
              {' '}and follow the instructions. If you want to use{' '}
              <b>
                your own number
              </b>
              {' '}as the{' '}
              <b>
                From Number
              </b>
              , go to{' '}
              <b>
                {`Messaging > Senders > WhatsApp senders`}
              </b>
              {' '}and follow the instructions.
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
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="permission_instuction_modal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-lg"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel1"
          >
            Permission Settings Instructions
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <ul>
            <li className="mb-2">
              <b>
                All Data Access:
              </b>
              {' '}If this option is selected, users or clients assigned to this role will have unrestricted access to all data, without any specific restrictions or limitations.
            </li>
            <li className="mb-2">
              <b>
                Allocated Data Access:
              </b>
              {' '}If this option is selected, users or clients assigned to this role will have restricted access to data based on specific assignments and restrictions.
            </li>
            <li className="mb-2">
              <b>
                Create Permission:
              </b>
              {' '}This determines whether users or clients assigned to this role can create new records. For example, if the create permission is enabled for projects, users or clients in this role will be able to create new projects; otherwise, they won’t have this ability.
            </li>
            <li className="mb-2">
              <b>
                Manage Permission:
              </b>
              {' '}This determines whether users or clients assigned to this role can access and interact with specific modules. For instance, if the manage permission is enabled for projects, users or clients in this role will be able to view projects however create, edit, or delete depending on the specific permissions granted. If the manage permission is disabled for projects, users or clients in this role won’t be able to view or interact with projects in any way.
            </li>
            <li className="mb-2">
              <b>
                Edit Permission:
              </b>
              {' '}This determines whether users or clients assigned to this role can edit current records. For example, if the edit permission is enabled for projects, users or clients in this role will be able to edit current projects; otherwise, they won’t have this ability.
            </li>
            <li>
              <b>
                Delete Permission:
              </b>
              {' '}This determines whether users or clients assigned to this role can delete current records. For example, if the delete permission is enabled for projects, users or clients in this role will be able to delete current projects; otherwise, they won’t have this ability.
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="confirmUpdateStatusModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Do You Want to Update the Status?
          </p>
          <textarea
            className="form-control"
            id="statusNote"
            placeholder="Optional Note"
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            id="declineUpdateStatus"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirmUpdateStatus"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="confirmUpdatePriorityModal"
    tabIndex="-1"
  >
    <div
      className="modal-dialog modal-sm"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h6
            className="modal-title"
            id="exampleModalLabel2"
          >
            Confirm!
          </h6>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <div className="modal-body">
          <p>
            Do You Want to Update the Priority?
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            id="declineUpdatePriority"
            type="button"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            id="confirmUpdatePriority"
            type="submit"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="createWorkspaceModal"
    tabIndex="-1"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Create Workspace
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <form
          action="../assets/workspaces/store"
          className="form-submit-event"
          method="POST"
        >
          <input
            name="dnr"
            type="hidden"
          />
          <div className="modal-body">
            <div className="row">
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="title"
                >
                  Title{' '}
                  <span className="asterisk">
                    *
                  </span>
                </label>
                <input
                  className="form-control"
                  defaultValue=""
                  id="title"
                  name="title"
                  placeholder="Please Enter Title"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="user_ids[]"
                >
                  Select Users
                </label>
                <div className="input-group">
                  <select
                    className="form-control js-example-basic-multiple"
                    data-placeholder="Type to Search"
                    multiple
                    name="user_ids[]"
                  >
                    <option
                      selected
                      value="7"
                    >
                      Admin Infinitie
                    </option>
                    <option value="76">
                      Memeber2 Infinitie
                    </option>
                    <option value="77">
                      Member Infinitie
                    </option>
                    <option value="79">
                      dummy one
                    </option>
                    <option value="80">
                      ABC PQR
                    </option>
                    <option value="81">
                      Elara Bishop
                    </option>
                    <option value="82">
                      Orion Caldwell
                    </option>
                    <option value="96">
                      Zenith Hayes
                    </option>
                    <option value="103">
                      Fig manager
                    </option>
                    <option value="104">
                      Prachi Patil
                    </option>
                    <option value="105">
                      xxx xxx
                    </option>
                    <option value="107">
                      Houssam Test
                    </option>
                    <option value="108">
                      KEMAL OZ
                    </option>
                    <option value="109">
                      бабораб gfhf
                    </option>
                    <option value="110">
                      da ad
                    </option>
                    <option value="111">
                      asdf asd
                    </option>
                    <option value="112">
                      Pera Peric
                    </option>
                    <option value="113">
                      Issam Sardar
                    </option>
                    <option value="114">
                      Issam Sardar
                    </option>
                    <option value="115">
                      fgbfgfgfgfgffg Solanki
                    </option>
                    <option value="116">
                      Puspendu Patra
                    </option>
                    <option value="117">
                      sdafas weareawfasd
                    </option>
                    <option value="118">
                      Mahmoud Basheer
                    </option>
                    <option value="119">
                      Uzzal Admin
                    </option>
                    <option value="120">
                      Uzzal User
                    </option>
                    <option value="121">
                      yesq nouy
                    </option>
                    <option value="122">
                      Charlton White
                    </option>
                    <option value="123">
                      test test 2
                    </option>
                    <option value="124">
                      Test test
                    </option>
                    <option value="125">
                      Oluseun Temiye
                    </option>
                    <option value="126">
                      Oluseun Temiye
                    </option>
                    <option value="127">
                      JAMES1 BELLO
                    </option>
                    <option value="130">
                      HAKAN YOK
                    </option>
                    <option value="131">
                      rabbil hasan
                    </option>
                    <option value="132">
                      babu Khan
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="client_ids[]"
                >
                  Select Clients
                </label>
                <div className="input-group">
                  <select
                    className="form-control js-example-basic-multiple"
                    data-placeholder="Type to Search"
                    multiple
                    name="client_ids[]"
                  >
                    <option value="66">
                      client Two
                    </option>
                    <option value="78">
                      Client One
                    </option>
                    <option value="79">
                      saifullah muhamad
                    </option>
                    <option value="80">
                      Nithin Viswanathan
                    </option>
                    <option value="81">
                      Kellan Ashford
                    </option>
                    <option value="82">
                      wdwdw wdwddw
                    </option>
                    <option value="83">
                      wdwdwasacs wdwdwasacs
                    </option>
                    <option value="85">
                      Tatiana Pogrebetskaya
                    </option>
                    <option value="86">
                      Johnathan Doe
                    </option>
                    <option value="87">
                      Shiva Prasad
                    </option>
                    <option value="88">
                      Dhananjay User
                    </option>
                    <option value="89">
                      rehtr drghf
                    </option>
                    <option value="90">
                      Sanjay Soni
                    </option>
                    <option value="91">
                      Diego Mau
                    </option>
                    <option value="92">
                      Dejan cl Gest
                    </option>
                    <option value="93">
                      hgfh hfh
                    </option>
                    <option value="94">
                      Md Aynal Haque
                    </option>
                    <option value="95">
                      test vpn
                    </option>
                    <option value="96">
                      Blaine Kane
                    </option>
                    <option value="97">
                      GAF CLIENT CLIENT
                    </option>
                    <option value="98">
                      test test
                    </option>
                    <option value="99">
                      Mahmoud Galal
                    </option>
                    <option value="100">
                      Micle Lion
                    </option>
                    <option value="101">
                      CLIENT AADDED
                    </option>
                    <option value="102">
                      sd dd
                    </option>
                    <option value="103">
                      Kola ross
                    </option>
                  </select>
                </div>
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
                      id="primaryWorkspace"
                      name="primaryWorkspace"
                      type="checkbox"
                    />
                    Primary Workspace?
                  </label>
                </div>
              </div>
            </div>
            <div
              className="alert alert-primary alert-dismissible"
              role="alert"
            >
              You Will Be Workspace Participant Automatically
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              id="submit_btn"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    className="modal fade"
    id="editWorkspaceModal"
    tabIndex="-1"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Update Workspace
          </h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          />
        </div>
        <form
          action="../assets/workspaces/update"
          className="form-submit-event"
          method="POST"
        >
          <input
            id="workspace_id"
            name="id"
            type="hidden"
          />
          <input
            name="dnr"
            type="hidden"
          />
          <div className="modal-body">
            <div className="row">
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="title"
                >
                  Title{' '}
                  <span className="asterisk">
                    *
                  </span>
                </label>
                <input
                  className="form-control"
                  defaultValue=""
                  id="workspace_title"
                  name="title"
                  placeholder="Please Enter Title"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="user_ids[]"
                >
                  Select Users
                </label>
                <div className="input-group">
                  <select
                    className="form-control js-example-basic-multiple"
                    data-placeholder="Type to Search"
                    multiple
                    name="user_ids[]"
                  >
                    <option
                      selected
                      value="7"
                    >
                      Admin Infinitie
                    </option>
                    <option value="76">
                      Memeber2 Infinitie
                    </option>
                    <option value="77">
                      Member Infinitie
                    </option>
                    <option value="79">
                      dummy one
                    </option>
                    <option value="80">
                      ABC PQR
                    </option>
                    <option value="81">
                      Elara Bishop
                    </option>
                    <option value="82">
                      Orion Caldwell
                    </option>
                    <option value="96">
                      Zenith Hayes
                    </option>
                    <option value="103">
                      Fig manager
                    </option>
                    <option value="104">
                      Prachi Patil
                    </option>
                    <option value="105">
                      xxx xxx
                    </option>
                    <option value="107">
                      Houssam Test
                    </option>
                    <option value="108">
                      KEMAL OZ
                    </option>
                    <option value="109">
                      бабораб gfhf
                    </option>
                    <option value="110">
                      da ad
                    </option>
                    <option value="111">
                      asdf asd
                    </option>
                    <option value="112">
                      Pera Peric
                    </option>
                    <option value="113">
                      Issam Sardar
                    </option>
                    <option value="114">
                      Issam Sardar
                    </option>
                    <option value="115">
                      fgbfgfgfgfgffg Solanki
                    </option>
                    <option value="116">
                      Puspendu Patra
                    </option>
                    <option value="117">
                      sdafas weareawfasd
                    </option>
                    <option value="118">
                      Mahmoud Basheer
                    </option>
                    <option value="119">
                      Uzzal Admin
                    </option>
                    <option value="120">
                      Uzzal User
                    </option>
                    <option value="121">
                      yesq nouy
                    </option>
                    <option value="122">
                      Charlton White
                    </option>
                    <option value="123">
                      test test 2
                    </option>
                    <option value="124">
                      Test test
                    </option>
                    <option value="125">
                      Oluseun Temiye
                    </option>
                    <option value="126">
                      Oluseun Temiye
                    </option>
                    <option value="127">
                      JAMES1 BELLO
                    </option>
                    <option value="130">
                      HAKAN YOK
                    </option>
                    <option value="131">
                      rabbil hasan
                    </option>
                    <option value="132">
                      babu Khan
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="client_ids[]"
                >
                  Select Clients
                </label>
                <div className="input-group">
                  <select
                    className="form-control js-example-basic-multiple"
                    data-placeholder="Type to Search"
                    multiple
                    name="client_ids[]"
                  >
                    <option value="66">
                      client Two
                    </option>
                    <option value="78">
                      Client One
                    </option>
                    <option value="79">
                      saifullah muhamad
                    </option>
                    <option value="80">
                      Nithin Viswanathan
                    </option>
                    <option value="81">
                      Kellan Ashford
                    </option>
                    <option value="82">
                      wdwdw wdwddw
                    </option>
                    <option value="83">
                      wdwdwasacs wdwdwasacs
                    </option>
                    <option value="85">
                      Tatiana Pogrebetskaya
                    </option>
                    <option value="86">
                      Johnathan Doe
                    </option>
                    <option value="87">
                      Shiva Prasad
                    </option>
                    <option value="88">
                      Dhananjay User
                    </option>
                    <option value="89">
                      rehtr drghf
                    </option>
                    <option value="90">
                      Sanjay Soni
                    </option>
                    <option value="91">
                      Diego Mau
                    </option>
                    <option value="92">
                      Dejan cl Gest
                    </option>
                    <option value="93">
                      hgfh hfh
                    </option>
                    <option value="94">
                      Md Aynal Haque
                    </option>
                    <option value="95">
                      test vpn
                    </option>
                    <option value="96">
                      Blaine Kane
                    </option>
                    <option value="97">
                      GAF CLIENT CLIENT
                    </option>
                    <option value="98">
                      test test
                    </option>
                    <option value="99">
                      Mahmoud Galal
                    </option>
                    <option value="100">
                      Micle Lion
                    </option>
                    <option value="101">
                      CLIENT AADDED
                    </option>
                    <option value="102">
                      sd dd
                    </option>
                    <option value="103">
                      Kola ross
                    </option>
                  </select>
                </div>
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
                      id="updatePrimaryWorkspace"
                      name="primaryWorkspace"
                      type="checkbox"
                    />
                    Primary Workspace?
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              type="button"
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              id="submit_btn"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default tag
