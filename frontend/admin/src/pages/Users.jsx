import React from 'react'
import Navbar from '../components/Navbar'

const Users = () => {
  return (
    <>
     
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
            Users
          </li>
        </ol>
      </nav>
    </div>
    <div>
      <a href="https://taskify.taskhub.company/users/create">
        <button
          className="btn btn-sm btn-primary action_create_users"
          data-bs-original-title="Create User"
          data-bs-placement="left"
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
      <div className="row">
        <div className="col-md-4 mb-3">
          <select
            aria-label="Default select example"
            className="form-select"
            id="user_status_filter"
          >
            <option value="">
              Select Status
            </option>
            <option value="1">
              Active
            </option>
            <option value="0">
              Deactive
            </option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <select
            className="form-control js-example-basic-multiple"
            data-placeholder="Select Roles"
            id="user_roles_filter"
            multiple
          >
            <option value="1">
              Admin
            </option>
            <option value="9">
              Member
            </option>
            <option value="21">
              Gerente
            </option>
            <option value="22">
              Developer
            </option>
            <option value="23">
              Admin one
            </option>
            <option value="24">
              Product manager
            </option>
            <option value="25">
              Gong
            </option>
            <option value="26">
              SIS
            </option>
            <option value="27">
              Test
            </option>
            <option value="28">
              Templatedata
            </option>
            <option value="29">
              Test12
            </option>
            <option value="30">
              Test_role
            </option>
            <option value="31">
              User
            </option>
            <option value="32">
              Test test role
            </option>
          </select>
        </div>
      </div>
      <div className="table-responsive text-nowrap">
        <input
          defaultValue="users"
          id="data_type"
          type="hidden"
        />
        <input
          id="save_column_visibility"
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
          data-url="/users/list"
          id="table"
        >
          <thead>
            <tr>
              <th data-checkbox="true" />
              <th
                data-field="id"
                data-sortable="true"
                data-visible="true"
              >
                ID
              </th>
              <th
                data-field="profile"
                data-visible="true"
              >
                Users
              </th>
              <th
                data-field="role"
                data-visible="true"
              >
                Role
              </th>
              <th
                data-field="phone"
                data-sortable="true"
                data-visible="true"
              >
                Phone Number
              </th>
              <th
                data-field="assigned"
                data-visible="true"
              >
                Assigned
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
              >
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Users
