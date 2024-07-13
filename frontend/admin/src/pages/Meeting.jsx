import React from 'react'
import Navbar from '../components/Navbar'

const Meeting = () => {
  return (
    <>
    <Navbar />
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
            Meetings
          </li>
        </ol>
      </nav>
    </div>
    <div>
      <a
        data-bs-target="#createMeetingModal"
        data-bs-toggle="modal"
        href="javascript:void(0);"
      >
        <button
          className="btn btn-sm btn-primary action_create_meetings"
          data-bs-original-title="Create Meeting"
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
          <div className="input-group input-group-merge">
            <input
              autoComplete="off"
              className="form-control"
              id="meeting_start_date_between"
              placeholder="Start Date Between"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="input-group input-group-merge">
            <input
              autoComplete="off"
              className="form-control"
              id="meeting_end_date_between"
              placeholder="End Date Between"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <select
            aria-label="Default select example"
            className="form-select"
            id="meeting_user_filter"
          >
            <option value="">
              Select User
            </option>
            <option value="7">
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
            <option value="109">
              бабораб gfhf
            </option>
            <option value="110">
              da ad
            </option>
            <option value="111">
              asdf asd
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
        <div className="col-md-4 mb-3">
          <select
            aria-label="Default select example"
            className="form-select"
            id="meeting_client_filter"
          >
            <option value="">
              Select Client
            </option>
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
            <option value="86">
              Johnathan Doe
            </option>
            <option value="87">
              Shiva Prasad
            </option>
            <option value="88">
              Dhananjay User
            </option>
            <option value="90">
              Sanjay Soni
            </option>
            <option value="91">
              Diego Mau
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
        <div className="col-md-4 mb-3">
          <select
            aria-label="Default select example"
            className="form-select"
            id="status_filter"
          >
            <option value="">
              Select Status
            </option>
            <option value="ongoing">
              Ongoing
            </option>
            <option value="yet_to_start">
              Yet to Start
            </option>
            <option value="ended">
              Ended
            </option>
          </select>
        </div>
      </div>
      <input
        id="meeting_start_date_from"
        type="hidden"
      />
      <input
        id="meeting_start_date_to"
        type="hidden"
      />
      <input
        id="meeting_end_date_from"
        type="hidden"
      />
      <input
        id="meeting_end_date_to"
        type="hidden"
      />
      <div className="table-responsive text-nowrap">
        <input
          defaultValue="meetings"
          id="data_type"
          type="hidden"
        />
        <input
          defaultValue="meetings_table"
          id="data_table"
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
          data-url="/meetings/list"
          id="meetings_table"
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
                data-field="title"
                data-sortable="true"
                data-visible="true"
              >
                Title
              </th>
              <th
                data-field="users"
                data-visible="true"
              >
                Users
              </th>
              <th
                data-field="clients"
                data-visible="true"
              >
                Clients
              </th>
              <th
                data-field="start_date_time"
                data-sortable="true"
                data-visible="true"
              >
                Starts At
              </th>
              <th
                data-field="end_date_time"
                data-sortable="true"
                data-visible="true"
              >
                Ends At
              </th>
              <th
                data-field="status"
                data-sortable="true"
                data-visible="true"
              >
                Status
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

export default Meeting
