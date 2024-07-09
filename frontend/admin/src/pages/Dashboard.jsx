import React from 'react'

const Dashboard = () => {
  return (
    
      <div className="content-wrapper">
          <div className="container-fluid">
            <div className="col-lg-12 col-md-12 order-1">
              <div className="row mt-4">
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <i className="menu-icon tf-icons bx bx-briefcase-alt-2 bx-md text-success" />
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Total Projects</span>
                      <h3 className="card-title mb-2">213</h3>
                      <a href="/projects"><small className="text-success fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <i className="menu-icon tf-icons bx bx-task bx-md text-primary" />
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Total Tasks</span>
                      <h3 className="card-title mb-2">352</h3>
                      <a href="/tasks/draggable"><small className="text-primary fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <i className="menu-icon tf-icons bx bxs-user-detail bx-md text-warning" />
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Total Users</span>
                      <h3 className="card-title mb-2">33</h3>
                      <a href="/users"><small className="text-warning fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <i className="menu-icon tf-icons bx bxs-user-detail bx-md text-info" />
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Total Clients</span>
                      <h3 className="card-title mb-2"> 21</h3>
                      <a href="/clients"><small className="text-info fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <div className="card overflow-hidden mb-4 statisticsDiv">
                    <div className="card-header pt-3 pb-1">
                      <div className="card-title mb-0">
                        <h5 className="m-0 me-2">Project Statistics</h5>
                      </div>
                      <div className="my-3">
                        <div id="projectStatisticsChart" />
                      </div>
                    </div>
                    <div className="card-body" id="project-statistics">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-primary" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/projects?status=1">
                                <h6 className="mb-0">Started</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">105</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-danger" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/projects?status=0">
                                <h6 className="mb-0">Default</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">65</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-info" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/projects?status=2">
                                <h6 className="mb-0">On Going</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">29</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-warning" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/projects?status=59">
                                <h6 className="mb-0">In Review</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">14</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-menu" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h5 className="mb-0">Total</h5>
                            </div>
                            <div className="user-progress">
                              <div className="status-count">
                                <h5 className="mb-0">213</h5>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                  <div className="card overflow-hidden mb-4 statisticsDiv">
                    <div className="card-header pt-3 pb-1">
                      <div className="card-title mb-0">
                        <h5 className="m-0 me-2">Task Statistics</h5>
                      </div>
                      <div className="my-3">
                        <div id="taskStatisticsChart" />
                      </div>
                    </div>
                    <div className="card-body" id="task-statistics">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-warning" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/tasks/draggable?status=59">
                                <h6 className="mb-0">In Review</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">156</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-primary" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/tasks/draggable?status=1">
                                <h6 className="mb-0">Started</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">119</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-info" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/tasks/draggable?status=2">
                                <h6 className="mb-0">On Going</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">74</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-danger" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <a href="/tasks/draggable?status=0">
                                <h6 className="mb-0">Default</h6>
                              </a>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">3</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-menu" /></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h5 className="mb-0">Total</h5>
                            </div>
                            <div className="user-progress">
                              <div className="status-count">
                                <h5 className="mb-0">352</h5>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                  <div className="card overflow-hidden mb-4 statisticsDiv">
                    <div className="card-header pt-3 pb-1">
                      <div className="card-title d-flex justify-content-between mb-0">
                        <h5 className="m-0 me-2">Todos Overview</h5>
                        <div>
                          <span data-bs-toggle="modal" data-bs-target="#create_todo_modal"><a href="javascript:void(0);" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Create Todo"><i className="bx bx-plus" /></a></span>
                          <a href="/todos"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="View More"><i className="bx bx-list-ul" /></button></a>
                        </div>
                      </div>
                      <div className="my-3">
                        <div id="todoStatisticsChart" />
                      </div>
                    </div>
                    <div className="card-body" id="todos-statistics">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0">
                            <input type="checkbox" id={207} onclick="update_status(this)" name={207} reload="true" className="form-check-input mt-0" defaultChecked />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 striked" id="207_title">adasd</h6>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={207} title="Update"><i className="bx bx-edit mx-1" /></a>
                                  <a href="javascript:void(0);" className="delete" data-id={207} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
                                </div>
                              </div>
                              <small className="text-muted d-block my-1">July 07, 2024 18:05:42</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0">
                            <input type="checkbox" id={204} onclick="update_status(this)" name={204} reload="true" className="form-check-input mt-0" defaultChecked />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 striked" id="204_title">waqas</h6>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={204} title="Update"><i className="bx bx-edit mx-1" /></a>
                                  <a href="javascript:void(0);" className="delete" data-id={204} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
                                </div>
                              </div>
                              <small className="text-muted d-block my-1">July 03, 2024 19:22:43</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0">
                            <input type="checkbox" id={203} onclick="update_status(this)" name={203} reload="true" className="form-check-input mt-0" defaultChecked />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 striked" id="203_title">rtr</h6>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={203} title="Update"><i className="bx bx-edit mx-1" /></a>
                                  <a href="javascript:void(0);" className="delete" data-id={203} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
                                </div>
                              </div>
                              <small className="text-muted d-block my-1">July 03, 2024 06:39:13</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0">
                            <input type="checkbox" id={202} onclick="update_status(this)" name={202} reload="true" className="form-check-input mt-0" defaultChecked />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 striked" id="202_title">test</h6>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={202} title="Update"><i className="bx bx-edit mx-1" /></a>
                                  <a href="javascript:void(0);" className="delete" data-id={202} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
                                </div>
                              </div>
                              <small className="text-muted d-block my-1">July 03, 2024 06:07:13</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0">
                            <input type="checkbox" id={198} onclick="update_status(this)" name={198} reload="true" className="form-check-input mt-0" defaultChecked />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 striked" id="198_title">as fast as possible</h6>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={198} title="Update"><i className="bx bx-edit mx-1" /></a>
                                  <a href="javascript:void(0);" className="delete" data-id={198} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
                                </div>
                              </div>
                              <small className="text-muted d-block my-1">June 30, 2024 06:08:53</small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-align-top">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-upcoming-birthdays" aria-controls="navs-top-upcoming-birthdays" aria-selected="true">
                    <i className="menu-icon tf-icons bx bx-cake text-success" /> Upcoming Birthdays              </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-upcoming-work-anniversaries" aria-controls="navs-top-upcoming-work-anniversaries" aria-selected="false">
                    <i className="menu-icon tf-icons bx bx-star text-primary" /> Upcoming Work Anniversaries              </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-members-on-leave" aria-controls="navs-top-members-on-leave" aria-selected="false">
                    <i className="menu-icon tf-icons bx bx-home text-danger" /> Members on Leave              </button>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="navs-top-upcoming-birthdays" role="tabpanel">
                  {/* Content for the "Upcoming birthdays" tab */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-upcoming-birthdays-list" aria-controls="navs-top-upcoming-birthdays-list" aria-selected="true">
                        List                      </button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-upcoming-birthdays-calendar" aria-controls="navs-top-upcoming-birthdays-calendar" aria-selected="false">
                        Calendar                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="navs-top-upcoming-birthdays-list" role="tabpanel">
                      {/* Content for the "List" tab under "Upcoming birthdays" */}
                      {/* projects card */}
                      <div className="align-items-baseline d-flex gap-1">
                        <div className="col-md-4">
                          <select className="form-select" id="birthday_user_filter" aria-label="Default select example">
                            <option value>Select Member</option>
                            <option value={7}>Admin Infinitie</option>
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
                            <option value={109}>бабораб gfhf</option>
                            <option value={110}>da ad</option>
                            <option value={111}>asdf asd</option>
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
                          </select>
                        </div>
                        <div className="mb-3 col-md-4">
                          <div className="input-group input-group-merge">
                            <input type="number" id="upcoming_days_bd" name="upcoming_days" className="form-control" min={0} placeholder="Till Upcoming Days: Default 30" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div>
                            <button type="button" id="upcoming_days_birthday_filter" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Filter"><i className="bx bx-filter-alt" /></button>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive text-nowrap">
                        <input type="hidden" id="data_type" defaultValue="users" />
                        <input type="hidden" id="data_table" defaultValue="birthdays_table" />
                        <div className="alert alert-info alert-dismissible" role="alert">Delete Selected Will Delete Selected Team Members.<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" /></div><table id="birthdays_table" data-toggle="table" data-loading-template="loadingTemplate" data-url="/home/upcoming-birthdays" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="dob" data-sort-order="asc" data-mobile-responsive="true" data-query-params="queryParamsUpcomingBirthdays">
                          <thead>
                            <tr>
                              <th data-checkbox="true" />
                              <th data-field="id">ID</th>
                              <th data-field="member">Member</th>
                              <th data-field="dob" data-sortable="true">Birth Day Date</th>
                              {/* <th data-field="age" data-visible="false">Birthday Count</th> */}
                              <th data-field="days_left">Days Left</th>
                            </tr>
                          </thead>
                        </table>
                      </div>                  </div>
                    <div className="tab-pane fade" id="navs-top-upcoming-birthdays-calendar" role="tabpanel">
                      {/* Content for the "Calendar" tab under "Upcoming birthdays" */}
                      <div id="upcomingBirthdaysCalendar" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="navs-top-upcoming-work-anniversaries" role="tabpanel">
                  {/* Content for the "Upcoming work anniversaries" tab */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-upcoming-work-anniversaries-list" aria-controls="navs-top-upcoming-work-anniversaries-list" aria-selected="true">
                        List                      </button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-upcoming-work-anniversaries-calendar" aria-controls="navs-top-upcoming-work-anniversaries-calendar" aria-selected="false">
                        Calendar                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="navs-top-upcoming-work-anniversaries-list" role="tabpanel">
                      {/* Content for the "List" tab under "Upcoming work anniversaries" */}
                      {/* projects card */}
                      <div className="align-items-baseline d-flex gap-1">
                        <div className="col-md-4">
                          <select className="form-select" id="wa_user_filter" aria-label="Default select example">
                            <option value>Select Member</option>
                            <option value={7}>Admin Infinitie</option>
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
                            <option value={109}>бабораб gfhf</option>
                            <option value={110}>da ad</option>
                            <option value={111}>asdf asd</option>
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
                          </select>
                        </div>
                        <div className="mb-3 col-md-4">
                          <div className="input-group input-group-merge">
                            <input type="number" id="upcoming_days_wa" name="upcoming_days" className="form-control" min={0} placeholder="Till Upcoming Days: Default 30" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div>
                            <button type="button" id="upcoming_days_wa_filter" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Filter"><i className="bx bx-filter-alt" /></button>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive text-nowrap">
                        <input type="hidden" id="data_type" defaultValue="users" />
                        <input type="hidden" id="data_table" defaultValue="wa_table" />
                        <div className="alert alert-info alert-dismissible" role="alert">Delete Selected Will Delete Selected Team Members.<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" /></div><table id="wa_table" data-toggle="table" data-loading-template="loadingTemplate" data-url="/home/upcoming-work-anniversaries" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="doj" data-sort-order="asc" data-mobile-responsive="true" data-query-params="queryParamsUpcomingWa">
                          <thead>
                            <tr>
                              <th data-checkbox="true" />
                              <th data-field="id">ID</th>
                              <th data-field="member">Member</th>
                              <th data-field="wa_date" data-sortable="true">Work Anniversary Date</th>
                              <th data-field="days_left">Days Left</th>
                            </tr>
                          </thead>
                        </table>
                      </div>                  </div>
                    <div className="tab-pane fade" id="navs-top-upcoming-work-anniversaries-calendar" role="tabpanel">
                      {/* Content for the "Calendar" tab under "Upcoming work anniversaries" */}
                      <div id="upcomingWorkAnniversariesCalendar" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="navs-top-members-on-leave" role="tabpanel">
                  {/* Content for the "Members on leave" tab */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-members-on-leave-list" aria-controls="navs-top-members-on-leave-list" aria-selected="true">
                        List                      </button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-members-on-leave-calendar" aria-controls="navs-top-members-on-leave-calendar" aria-selected="false">
                        Calendar                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="navs-top-members-on-leave-list" role="tabpanel">
                      {/* Content for the "List" tab under "Members on leave" */}
                      {/* projects card */}
                      <div className="align-items-baseline d-flex gap-1">
                        <div className="col-md-4">
                          <select className="form-select" id="mol_user_filter" aria-label="Default select example">
                            <option value>Select Member</option>
                            <option value={7}>Admin Infinitie</option>
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
                            <option value={109}>бабораб gfhf</option>
                            <option value={110}>da ad</option>
                            <option value={111}>asdf asd</option>
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
                          </select>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="input-group input-group-merge">
                            <input type="number" id="upcoming_days_mol" name="upcoming_days" className="form-control" min={0} placeholder="Till Upcoming Days: Default 30" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div>
                            <button type="button" id="upcoming_days_mol_filter" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Filter"><i className="bx bx-filter-alt" /></button>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive text-nowrap">
                        <input type="hidden" id="data_type" defaultValue="users" />
                        <input type="hidden" id="data_table" defaultValue="mol_table" />
                        <div className="alert alert-info alert-dismissible" role="alert">Delete Selected Will Delete Selected Team Members.<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" /></div><table id="mol_table" data-toggle="table" data-loading-template="loadingTemplate" data-url="/home/members-on-leave" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="leave_requests.from_date" data-sort-order="asc" data-mobile-responsive="true" data-query-params="queryParamsMol">
                          <thead>
                            <tr>
                              <th data-checkbox="true" />
                              <th data-field="id">ID</th>
                              <th data-field="member">Member</th>
                              <th data-field="from_date" data-sortable="true">From</th>
                              <th data-field="to_date" data-sortable="true">To</th>
                              <th data-field="type">Type</th>
                              <th data-sortable="false" data-field="duration">Duration</th>
                              <th data-field="days_left">Days Left</th>
                            </tr>
                          </thead>
                        </table>
                      </div>                  </div>
                    <div className="tab-pane fade" id="navs-top-members-on-leave-calendar" role="tabpanel">
                      {/* Content for the "Calendar" tab under "Members on leave" */}
                      <div id="membersOnLeaveCalendar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-align-top mt-4">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-projects" aria-controls="navs-top-projects" aria-selected="true">
                    <i className="menu-icon tf-icons bx bx-briefcase-alt-2 text-success" />Projects              </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-tasks" aria-controls="navs-top-tasks" aria-selected="false">
                    <i className="menu-icon tf-icons bx bx-task text-primary" />Tasks              </button>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="navs-top-projects" role="tabpanel">
                  <div className="d-flex justify-content-between">
                    <h4 className="fw-bold">Admin's Projects</h4>
                  </div>
                  {/* projects card */}
                  <div className="mt-2">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input type="text" id="project_start_date_between" name="start_date_between" className="form-control" placeholder="Start Date Between" autoComplete="off" />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input type="text" id="project_end_date_between" name="project_end_date_between" className="form-control" placeholder="End Date Between" autoComplete="off" />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-select" id="projects_user_filter" aria-label="Default select example">
                          <option value>Select User</option>
                          <option value={7}>Admin Infinitie</option>
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
                          <option value={109}>бабораб gfhf</option>
                          <option value={110}>da ad</option>
                          <option value={111}>asdf asd</option>
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
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-select" id="projects_client_filter" aria-label="Default select example">
                          <option value>Select Client</option>
                          <option value={66}>client Two</option>
                          <option value={78}>Client One</option>
                          <option value={79}>saifullah muhamad</option>
                          <option value={80}>Nithin Viswanathan</option>
                          <option value={81}>Kellan Ashford</option>
                          <option value={86}>Johnathan Doe</option>
                          <option value={87}>Shiva Prasad</option>
                          <option value={88}>Dhananjay User</option>
                          <option value={90}>Sanjay Soni</option>
                          <option value={91}>Diego Mau</option>
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
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-select" id="status_filter" aria-label="Default select example">
                          <option value>Select Status</option>
                          <option value={0}>Default</option>
                          <option value={1}>Started</option>
                          <option value={2}>On Going</option>
                          <option value={59}>In Review</option>
                        </select>
                      </div>
                    </div>
                    <input type="hidden" name="project_start_date_from" id="project_start_date_from" />
                    <input type="hidden" name="project_start_date_to" id="project_start_date_to" />
                    <input type="hidden" name="project_end_date_from" id="project_end_date_from" />
                    <input type="hidden" name="project_end_date_to" id="project_end_date_to" />
                    <input type="hidden" id="is_favorites" defaultValue />
                    <div className="table-responsive text-nowrap">
                      <input type="hidden" id="data_type" defaultValue="projects" />
                      <input type="hidden" id="data_table" defaultValue="projects_table" />
                      <input type="hidden" id="save_column_visibility" />
                      <table id="projects_table" data-toggle="table" data-url="/projects/listing" data-loading-template="loadingTemplate" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="id" data-sort-order="desc" data-mobile-responsive="true" data-query-params="queryParamsProjects">
                        <thead>
                          <tr>
                            <th data-checkbox="true" />
                            <th data-field="id" data-visible="true" data-sortable="true">ID</th>
                            <th data-field="title" data-visible="true" data-sortable="true">Title</th>
                            <th data-field="users" data-visible="true">Users</th>
                            <th data-field="clients" data-visible="true">Clients</th>
                            <th data-field="status_id" data-visible="true" data-sortable="true" className="status-column">Status</th>
                            <th data-field="priority_id" data-visible="true" data-sortable="true" className="priority-column">Priority</th>
                            <th data-field="start_date" data-visible="true" data-sortable="true">Starts At</th>
                            <th data-field="end_date" data-visible="true" data-sortable="true">Ends At</th>
                            <th data-field="budget" data-visible="true" data-sortable="true">Budget</th>
                            <th data-field="tags" data-visible="true" data-sortable="true">Tags</th>
                            <th data-field="created_at" data-visible="false" data-sortable="true">Created At</th>
                            <th data-field="updated_at" data-visible="false" data-sortable="true">Updated At</th>
                            <th data-field="actions" data-visible="true">Actions</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade " id="navs-top-tasks" role="tabpanel">
                  <div className="d-flex justify-content-between">
                    <h4 className="fw-bold">Admin's Tasks</h4>
                  </div>
                  {/* tasks */}
                  <div className="mt-2">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input type="text" id="task_start_date_between" name="task_start_date_between" className="form-control" placeholder="Start Date Between" autoComplete="off" />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="input-group input-group-merge">
                          <input type="text" id="task_end_date_between" name="task_end_date_between" className="form-control" placeholder="End Date Between" autoComplete="off" />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-control js-example-basic-multiple" id="tasks_project_filter" multiple="multiple" data-placeholder="Select Projects">
                          <option value={88}>EcoMarket</option>
                          <option value={90}>Project Planning for AI and ML</option>
                          <option value={162}>UI Design for the Restaurant App</option>
                          <option value={164}>Uber Web App Clone</option>
                          <option value={165}>sdfsdfsdfsdf</option>
                          <option value={166}>Project 1</option>
                          <option value={169}>zcv</option>
                          <option value={170}>ruryturtu</option>
                          <option value={171}>Deeni Kutub</option>
                          <option value={172}>Image to Text</option>
                          <option value={173}>Shopify Changes</option>
                          <option value={174}>NOVEMBER 2023</option>
                          <option value={175}>ruryturtu</option>
                          <option value={176}>Flytt</option>
                          <option value={177}>test</option>
                          <option value={179}>Flutter</option>
                          <option value={180}>demo</option>
                          <option value={181}>Developer</option>
                          <option value={182}>Test project</option>
                          <option value={184}>tester</option>
                          <option value={186}>Construction Project</option>
                          <option value={187}>Construction Project</option>
                          <option value={188}>Día center</option>
                          <option value={189}>Día center</option>
                          <option value={191}>Día center</option>
                          <option value={192}>Offboarding Juan Perez</option>
                          <option value={193}>Burbank Home 4859 w 98 ST</option>
                          <option value={194}>Tesco</option>
                          <option value={195}>Keraina</option>
                          <option value={196}>metro Lundi</option>
                          <option value={197}>metro Lundi</option>
                          <option value={198}>Create CRUD for project (name)</option>
                          <option value={200}>تجارة السيارات</option>
                          <option value={201}>Testt</option>
                          <option value={202}>Sample_Project</option>
                          <option value={203}>tester 1</option>
                          <option value={204}>Masaha Equipment co</option>
                          <option value={205}>xxx</option>
                          <option value={206}>Prova</option>
                          <option value={207}>Prova</option>
                          <option value={208}>cgd</option>
                          <option value={209}>The Next Project</option>
                          <option value={210}>Website</option>
                          <option value={213}>dsf</option>
                          <option value={214}>SMS</option>
                          <option value={215}>Teste</option>
                          <option value={218}>NENA TEST</option>
                          <option value={220}>Product V2</option>
                          <option value={221}>test</option>
                          <option value={222}>Hello</option>
                          <option value={223}>Hello</option>
                          <option value={224}>focop</option>
                          <option value={225}>Starbucks</option>
                          <option value={226}>Test1234</option>
                          <option value={227}>GST Filling</option>
                          <option value={228}>SB100</option>
                          <option value={231}>kkkkkk</option>
                          <option value={232}>test project</option>
                          <option value={233}>DSFSFSDSD</option>
                          <option value={234}>Projekt 1</option>
                          <option value={235}>AAA</option>
                          <option value={236}>Red Ladder Roofing - Live Transfer System</option>
                          <option value={237}>DC</option>
                          <option value={238}>Erte BusinessOne</option>
                          <option value={240}>test</option>
                          <option value={241}>test amirul</option>
                          <option value={244}>ghgjggjh</option>
                          <option value={246}>hgjhg</option>
                          <option value={247}>test</option>
                          <option value={248}>dws</option>
                          <option value={249}>sdasad</option>
                          <option value={250}>sdasd</option>
                          <option value={251}>fdsdfs</option>
                          <option value={252}>Testing</option>
                          <option value={253}>Fencing</option>
                          <option value={254}>Kevin test</option>
                          <option value={255}>my test project cyra</option>
                          <option value={256}>asasaa</option>
                          <option value={257}>ABC</option>
                          <option value={258}>dasdas</option>
                          <option value={259}>Testprojekt</option>
                          <option value={260}>sdfsdfdsf</option>
                          <option value={261}>sdfsdfdsf</option>
                          <option value={262}>Solisten vastleggen</option>
                          <option value={264}>GIVEAWAY PREP</option>
                          <option value={265}>GIVEAWAY PREP</option>
                          <option value={266}>sfsdfsfd</option>
                          <option value={267}>Translations</option>
                          <option value={268}>gjgj</option>
                          <option value={269}>sdcdsfs</option>
                          <option value={270}>Progetto 1</option>
                          <option value={271}>ssd</option>
                          <option value={272}>LH-400</option>
                          <option value={273}>My Project</option>
                          <option value={274}>elsayd</option>
                          <option value={275}>test</option>
                          <option value={276}>xxx</option>
                          <option value={277}>MOKOENA MOKOENA</option>
                          <option value={278}>Demo Project 123</option>
                          <option value={279}>Lead IndiaMart</option>
                          <option value={280}>food</option>
                          <option value={281}>translation of</option>
                          <option value={282}>Website for Music Pop singer</option>
                          <option value={283}>testgm</option>
                          <option value={285}>TZ</option>
                          <option value={286}>test project</option>
                          <option value={287}>demo 1</option>
                          <option value={289}>new Project</option>
                          <option value={290}>MEME</option>
                          <option value={291}>Ad account 1</option>
                          <option value={292}>Sidharth rai reels</option>
                          <option value={293}>CQC REGISTRATION</option>
                          <option value={296}>12345678</option>
                          <option value={297}>Shopify</option>
                          <option value={298}>yutu</option>
                          <option value={299}>seo</option>
                          <option value={301}>seo</option>
                          <option value={302}>asdasd</option>
                          <option value={303}>Demo Project</option>
                          <option value={304}>demo1</option>
                          <option value={305}>first project</option>
                          <option value={306}>split - {'{'}d{'{'}d  -</option>
                          <option value={307}>Ecommerce</option>
                          <option value={308}>test a</option>
                          <option value={309}>test</option>
                          <option value={310}>tes ss</option>
                          <option value={311}>test project mo</option>
                          <option value={312}>SUPRA FIT</option>
                          <option value={313}>SUPRA FIT</option>
                          <option value={314}>Hungary</option>
                          <option value={315}>клиика</option>
                          <option value={316}>BPOM Aja ges</option>
                          <option value={317}>Build Farm Villa in Dubai</option>
                          <option value={320}>E-Commerce Management Laravel with Vue</option>
                          <option value={321}>3ar3our</option>
                          <option value={322}>test</option>
                          <option value={323}>UNIFOM</option>
                          <option value={324}>Sia</option>
                          <option value={327}>Sia</option>
                          <option value={328}>cccc</option>
                          <option value={329}>клиика</option>
                          <option value={330}>AC 2</option>
                          <option value={331}>Testing project</option>
                          <option value={332}>498</option>
                          <option value={333}>MYNEWPRO</option>
                          <option value={334}>sdfsdfsdfsdfsdf</option>
                          <option value={335}>Agile IT Tech DIgital Marketing</option>
                          <option value={336}>digital campaigns</option>
                          <option value={339}>الحرية</option>
                          <option value={340}>test</option>
                          <option value={342}>Para Fins de Teste</option>
                          <option value={344}>Website Development</option>
                          <option value={345}>New UI Implementation</option>
                          <option value={346}>Taskify SaaS CRM</option>
                          <option value={347}>Knowledge John Video App</option>
                          <option value={350}>AI Project on the way</option>
                          <option value={352}>Apple Factory</option>
                          <option value={353}>ok</option>
                          <option value={354}>Hello</option>
                          <option value={358}>Project 1</option>
                          <option value={359}>bully</option>
                          <option value={361}>sd123456</option>
                          <option value={362}>title</option>
                          <option value={363}>Job Portal</option>
                          <option value={364}>Ads HL</option>
                          <option value={365}>GSTR-1</option>
                          <option value={366}>CR</option>
                          <option value={367}>ter</option>
                          <option value={369}>VOLGO</option>
                          <option value={370}>vpn</option>
                          <option value={371}>Inventory Management system</option>
                          <option value={372}>taskify</option>
                          <option value={373}>Amos test</option>
                          <option value={380}>hdhhdhd</option>
                          <option value={381}>testing project</option>
                          <option value={382}>teswt</option>
                          <option value={383}>teswt</option>
                          <option value={384}>paint serives app</option>
                          <option value={385}>Creat POS software</option>
                          <option value={386}>PROYECTO 1</option>
                          <option value={387}>shiva</option>
                          <option value={388}>Visa application</option>
                          <option value={390}>teswt</option>
                          <option value={391}>Site Plan</option>
                          <option value={392}>Northing</option>
                          <option value={393}>rgvrfgrfgb</option>
                          <option value={395}>Reliquias</option>
                          <option value={399}>test</option>
                          <option value={400}>bn</option>
                          <option value={401}>test project 1</option>
                          <option value={403}>COMPRA DE ESPADAS CODIGO BARRA</option>
                          <option value={404}>rgs</option>
                          <option value={405}>DDD</option>
                          <option value={406}>Web Development SAAS</option>
                          <option value={407}>مشروع مادة الرياضيات</option>
                          <option value={408}>GAFD PROJECT</option>
                          <option value={409}>TSM</option>
                          <option value={410}>TSM</option>
                          <option value={411}>Testing Project</option>
                          <option value={412}>EDmS</option>
                          <option value={413}>ahşap stand</option>
                          <option value={414}>I want to eat</option>
                          <option value={415}>Monitoring</option>
                          <option value={416}>Renovation</option>
                          <option value={417}>test</option>
                          <option value={419}>CAM KABİN TEMMUZ</option>
                          <option value={420}>TESTAR</option>
                          <option value={421}>TESTAR 2</option>
                          <option value={423}>PROJECT ACA</option>
                          <option value={424}>Uber Web App Clone</option>
                          <option value={426}>Tour Site</option>
                          <option value={427}>as</option>
                          <option value={429}>dự án 1</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-control js-example-basic-multiple" id="tasks_user_filter" name="user_ids[]" multiple="multiple" data-placeholder="Select Users">
                          <option value={7}>Admin Infinitie</option>
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
                          <option value={109}>бабораб gfhf</option>
                          <option value={110}>da ad</option>
                          <option value={111}>asdf asd</option>
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
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-control js-example-basic-multiple" id="tasks_client_filter" name="client_ids[]" multiple="multiple" data-placeholder="Select Clients">&gt;
                          <option value={66}>client Two</option>
                          <option value={78}>Client One</option>
                          <option value={79}>saifullah muhamad</option>
                          <option value={80}>Nithin Viswanathan</option>
                          <option value={81}>Kellan Ashford</option>
                          <option value={86}>Johnathan Doe</option>
                          <option value={87}>Shiva Prasad</option>
                          <option value={88}>Dhananjay User</option>
                          <option value={90}>Sanjay Soni</option>
                          <option value={91}>Diego Mau</option>
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
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-control" id="task_status_filter" name="status_ids[]" multiple="multiple" data-placeholder="Select Statuses">
                          <option value={0}>Default</option>
                          <option value={1}>Started</option>
                          <option value={2}>On Going</option>
                          <option value={59}>In Review</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <select className="form-control" id="task_priority_filter" name="priority_ids[]" multiple="multiple" data-placeholder="Select Priorities">
                          <option value={0}>Default</option>
                        </select>
                      </div>
                    </div>
                    <input type="hidden" name="task_start_date_from" id="task_start_date_from" />
                    <input type="hidden" name="task_start_date_to" id="task_start_date_to" />
                    <input type="hidden" name="task_end_date_from" id="task_end_date_from" />
                    <input type="hidden" name="task_end_date_to" id="task_end_date_to" />
                    <div className="table-responsive text-nowrap">
                      <input type="hidden" id="data_type" defaultValue="tasks" />
                      <input type="hidden" id="data_table" defaultValue="task_table" />
                      <input type="hidden" id="save_column_visibility" />
                      <table id="task_table" data-toggle="table" data-loading-template="loadingTemplate" data-url="/tasks/list" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="id" data-sort-order="desc" data-mobile-responsive="true" data-query-params="queryParamsTasks">
                        <thead>
                          <tr>
                            <th data-checkbox="true" />
                            <th data-field="id" data-visible="true" data-sortable="true">ID</th>
                            <th data-field="title" data-visible="true" data-sortable="true">Task</th>
                            <th data-field="project_id" data-visible="true" data-sortable="true">Project</th>
                            <th data-field="users" data-visible="true">Users</th>
                            <th data-field="clients" data-visible="false">Clients</th>
                            <th data-field="status_id" className="status-column" data-visible="true" data-sortable="true">Status</th>
                            <th data-field="priority_id" className="priority-column" data-visible="true" data-sortable="true">Priority</th>
                            <th data-field="start_date" data-visible="true" data-sortable="true">Starts At</th>
                            <th data-field="end_date" data-visible="true" data-sortable="true">Ends At</th>
                            <th data-field="created_at" data-visible="false" data-sortable="true">Created At</th>
                            <th data-field="updated_at" data-visible="false" data-sortable="true">Updated At</th>
                            <th data-field="actions" data-visible="true">Actions</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------------- */}
          </div>
          <div className="modal fade" id="create_todo_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form className="modal-content form-submit-event" action="todos/store" method="POST">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Create Todo</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Title <span className="asterisk">*</span></label>
                      <input type="text" className="form-control" name="title" placeholder="Please Enter Title" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Priority <span className="asterisk">*</span></label>
                      <select className="form-select" name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" name="description" placeholder="Please Enter Description" defaultValue={""} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="edit_todo_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form action="todos/update" className="modal-content form-submit-event" method="POST">
                <input type="hidden" name="id" id="todo_id" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Update Todo</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Title <span className="asterisk">*</span></label>
                      <input type="text" id="todo_title" className="form-control" name="title" placeholder="Please Enter Title" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Priority <span className="asterisk">*</span></label>
                      <select className="form-select" id="todo_priority" name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="todo_description" name="description" placeholder="Please Enter Description" defaultValue={""} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="submit_btn">Update</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="default_language_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Want to Set As Your Primary Language?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirm">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="set_default_view_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Want to Set as Default View?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirm">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="confirmSaveColumnVisibility" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Want to Save Column Visibility?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirm">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="leaveWorkspaceModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Warning</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  Are You Sure You Want Leave This Workspace?          </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-danger" id="confirm">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="create_language_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <form className="modal-content form-submit-event" action="settings/languages/store" method="POST">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Create Language</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Title <span className="asterisk">*</span></label>
                      <input type="text" className="form-control" name="name" placeholder="For Example: English" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Code <span className="asterisk">*</span></label>
                      <input type="text" className="form-control" name="code" placeholder="For Example: en" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="edit_language_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <form className="modal-content form-submit-event" action="settings/languages/update" method="POST">
                <input type="hidden" name="id" id="language_id" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Update Language</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Title <span className="asterisk">*</span></label>
                      <input type="text" className="form-control" name="name" id="language_title" placeholder="For Example: English" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="create_contract_type_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <form className="modal-content form-submit-event" action="contracts/store-contract-type" method="POST">
                <input type="hidden" name="dnr" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Create Contract Type</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Type <span className="asterisk">*</span></label>
                      <input type="text" className="form-control" name="type" placeholder="Please Enter Contract Type" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="edit_contract_type_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <form className="modal-content form-submit-event" action="contracts/update-contract-type" method="POST">
                <input type="hidden" name="dnr" />
                <input type="hidden" id="update_contract_type_id" name="id" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Update Contract Type</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col mb-3">
                      <label htmlFor="nameBasic" className="form-label">Type <span className="asterisk">*</span></label>
                      <input type="text" className="form-control" name="type" id="contract_type" placeholder="Please Enter Contract Type" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="deleteAccountModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Warning</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Sure You Want to Delete Your Account?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <form id="formAccountDeactivation" action="/account/destroy/7" method="POST">
                    <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />                    <input type="hidden" name="_method" defaultValue="DELETE" />                    <button type="submit" className="btn btn-danger">Yes</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="deleteModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel2">Warning</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> '</button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-danger" id="confirmDelete">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="confirmDeleteSelectedModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel2">Warning</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> '</button>
                </div>
                <div className="modal-body">
                  <p>Are You Sure You Want to Delete Selected Record(s)?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-danger" id="confirmDeleteSelections">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="duplicateModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Warning</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Sure You Want to Duplicate?</p>
                  <div id="titleDiv" className="d-none"><label className="form-label">Update Title</label><input type="text" className="form-control" id="updateTitle" placeholder="Enter Title For Item Being Duplicated" /></div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirmDuplicate">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="timerModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Time Tracker</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="stopwatch">
                    <div className="stopwatch_time">
                      <input type="text" name="hour" id="hour" className="form-control stopwatch_time_input" readOnly />
                      <div className="stopwatch_time_lable">Hours</div>
                    </div>
                    <div className="stopwatch_time">
                      <input type="text" name="minute" id="minute" className="form-control stopwatch_time_input" readOnly />
                      <div className="stopwatch_time_lable">Minutes</div>
                    </div>
                    <div className="stopwatch_time">
                      <input type="text" name="second" id="second" className="form-control stopwatch_time_input" readOnly />
                      <div className="stopwatch_time_lable">Second</div>
                    </div>
                  </div>
                  <div className="selectgroup selectgroup-pills d-flex justify-content-around mt-3">
                    <label className="selectgroup-item">
                      <span className="selectgroup-button selectgroup-button-icon" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Start" id="start" onclick="startTimer()"><i className="bx bx-play" /></span>
                    </label>
                    <label className="selectgroup-item">
                      <span className="selectgroup-button selectgroup-button-icon" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Stop" id="end" onclick="stopTimer()"><i className="bx bx-stop" /></span>
                    </label>
                    <label className="selectgroup-item">
                      <span className="selectgroup-button selectgroup-button-icon" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Pause" id="pause" onclick="pauseTimer()"><i className="bx bx-pause" /></span>
                    </label>
                  </div>
                  <div className="form-group mb-0 mt-3">
                    <label className="label">Message:</label>
                    <textarea className="form-control" id="time_tracker_message" placeholder="Please Enter Your Message" name="message" defaultValue={""} />
                  </div>
                  <div className="modal-footer justify-content-center">
                    <a href="/time-tracker" className="btn btn-primary"><i className="bx bxs-time" /> View Timesheet</a>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="stopTimerModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel2">Warning</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> '</button>
                </div>
                <div className="modal-body">
                  <p>Are You Sure You Want to Stop the Timer?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-danger" id="confirmStop">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="mark_all_notifications_as_read_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Sure You Want to Mark All Notifications as Read?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirmMarkAllAsRead">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="update_notification_status_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are You Sure You Want to Update Notification Status?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirmNotificationStatus">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="restore_default_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to restore default template?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirmRestoreDefault">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="sms_instuction_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Sms Gateway Configuration</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <ul>
                    <li>Read and follow instructions carefully while configuration sms gateway setting </li>
                    <li className="my-4">Firstly open your sms gateway account . You can find api keys in your account -&gt; API keys &amp; credentials -&gt; create api key </li>
                    <li className="my-4">After create key you can see here Account sid and auth token </li>
                    <div className="simplelightbox-gallery">
                      <a href="storage/images/base_url_and_params.png" target="_blank">
                        <img src="storage/images/base_url_and_params.png" className="w-100" />
                      </a>
                    </div>
                    <li className="my-4">For Base url Messaging -&gt; Send an SMS</li>
                    <div className="simplelightbox-gallery">
                      <a href="storage/images/api_key_and_token.png" target="_blank">
                        <img src="storage/images/api_key_and_token.png" className="w-100" />
                      </a>
                    </div>
                    <li className="my-4">check this for admin panel settings</li>
                    <div className="simplelightbox-gallery">
                      <a href="storage/images/sms_gateway_1.png" target="_blank">
                        <img src="storage/images/sms_gateway_1.png" className="w-100" />
                      </a>
                    </div>
                    <div className="simplelightbox-gallery">
                      <a href="storage/images/sms_gateway_2.png" target="_blank">
                        <img src="storage/images/sms_gateway_2.png" className="w-100" />
                      </a>
                    </div>
                    <li className="my-4"><b>Make sure you entered valid data as per instructions before proceed</b></li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="whatsapp_instuction_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">WhatsApp Configuration</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <ul>
                    <li className="mb-2">You can find your <b>Account SID</b> and <b>Auth Token</b> on the Twilio Console dashboard page.</li>
                    <li className="mb-2"><b>From Number:</b> To get a test <b>From Number</b>, log in to your Twilio Console and go to <b>Messaging &gt; Try it out &gt; Send a WhatsApp message</b> and follow the instructions. If you want to use <b>your own number</b> as the <b>From Number</b>, go to <b>Messaging &gt; Senders &gt; WhatsApp senders</b> and follow the instructions.</li>
                    <li className="mb-2"><b>Feel free to reach out to us if you encounter any difficulties.</b></li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="permission_instuction_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Permission Settings Instructions</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <ul>
                    <li className="mb-2"><b>All Data Access:</b> If this option is selected, users or clients assigned to this role will have unrestricted access to all data, without any specific restrictions or limitations.</li>
                    <li className="mb-2"><b>Allocated Data Access:</b> If this option is selected, users or clients assigned to this role will have restricted access to data based on specific assignments and restrictions.</li>
                    <li className="mb-2"><b>Create Permission:</b> This determines whether users or clients assigned to this role can create new records. For example, if the create permission is enabled for projects, users or clients in this role will be able to create new projects; otherwise, they won’t have this ability.</li>
                    <li className="mb-2"><b>Manage Permission:</b> This determines whether users or clients assigned to this role can access and interact with specific modules. For instance, if the manage permission is enabled for projects, users or clients in this role will be able to view projects however create, edit, or delete depending on the specific permissions granted. If the manage permission is disabled for projects, users or clients in this role won’t be able to view or interact with projects in any way.</li>
                    <li className="mb-2"><b>Edit Permission:</b> This determines whether users or clients assigned to this role can edit current records. For example, if the edit permission is enabled for projects, users or clients in this role will be able to edit current projects; otherwise, they won’t have this ability.</li>
                    <li><b>Delete Permission:</b> This determines whether users or clients assigned to this role can delete current records. For example, if the delete permission is enabled for projects, users or clients in this role will be able to delete current projects; otherwise, they won’t have this ability.</li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="create_task_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <form action="/tasks/store" className="form-submit-event modal-content" method="POST">
                <input type="hidden" name="dnr" />
                <input type="hidden" name="table" defaultValue="task_table" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Create Task</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
                      <input className="form-control" type="text" name="title" placeholder="Please Enter Title" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="status">Status <span className="asterisk">*</span></label>
                      <div className="input-group">
                        <select className="form-select statusDropdown" name="status_id">
                          <option value={0} data-color="danger" selected>Default (danger)</option>
                          <option value={1} data-color="primary">Started (primary)</option>
                          <option value={2} data-color="info">On Going (info)</option>
                          <option value={59} data-color="warning">In Review (warning)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreateStatusModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create Status"><i className="bx bx-plus" /></button></a>
                        <a href="/status/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Statuses"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Priority</label>
                      <div className="input-group">
                        <select className="form-select" name="priority_id">
                          <option value={0} className="badge bg-label-secondary" selected>Default (secondary)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreatePriorityModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create priority"><i className="bx bx-plus" /></button></a>
                        <a href="/priority/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Priorities"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="start_date">Starts At <span className="asterisk">*</span></label>
                      <input type="text" id="task_start_date" name="start_date" className="form-control" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="due_date">Ends At <span className="asterisk">*</span></label>
                      <input type="text" id="task_end_date" name="due_date" className="form-control" defaultValue />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="user_id">Select Project <span className="asterisk">*</span></label>
                      <div className="input-group">
                        <select className="form-control selectTaskProject" name="project" data-placeholder="Type to Search">
                          <option value />
                          <option value={88}>EcoMarket</option>
                          <option value={90}>Project Planning for AI and ML</option>
                          <option value={162}>UI Design for the Restaurant App</option>
                          <option value={164}>Uber Web App Clone</option>
                          <option value={165}>sdfsdfsdfsdf</option>
                          <option value={166}>Project 1</option>
                          <option value={169}>zcv</option>
                          <option value={170}>ruryturtu</option>
                          <option value={171}>Deeni Kutub</option>
                          <option value={172}>Image to Text</option>
                          <option value={173}>Shopify Changes</option>
                          <option value={174}>NOVEMBER 2023</option>
                          <option value={175}>ruryturtu</option>
                          <option value={176}>Flytt</option>
                          <option value={177}>test</option>
                          <option value={179}>Flutter</option>
                          <option value={180}>demo</option>
                          <option value={181}>Developer</option>
                          <option value={182}>Test project</option>
                          <option value={184}>tester</option>
                          <option value={186}>Construction Project</option>
                          <option value={187}>Construction Project</option>
                          <option value={188}>Día center</option>
                          <option value={189}>Día center</option>
                          <option value={191}>Día center</option>
                          <option value={192}>Offboarding Juan Perez</option>
                          <option value={193}>Burbank Home 4859 w 98 ST</option>
                          <option value={194}>Tesco</option>
                          <option value={195}>Keraina</option>
                          <option value={196}>metro Lundi</option>
                          <option value={197}>metro Lundi</option>
                          <option value={198}>Create CRUD for project (name)</option>
                          <option value={200}>تجارة السيارات</option>
                          <option value={201}>Testt</option>
                          <option value={202}>Sample_Project</option>
                          <option value={203}>tester 1</option>
                          <option value={204}>Masaha Equipment co</option>
                          <option value={205}>xxx</option>
                          <option value={206}>Prova</option>
                          <option value={207}>Prova</option>
                          <option value={208}>cgd</option>
                          <option value={209}>The Next Project</option>
                          <option value={210}>Website</option>
                          <option value={213}>dsf</option>
                          <option value={214}>SMS</option>
                          <option value={215}>Teste</option>
                          <option value={218}>NENA TEST</option>
                          <option value={220}>Product V2</option>
                          <option value={221}>test</option>
                          <option value={222}>Hello</option>
                          <option value={223}>Hello</option>
                          <option value={224}>focop</option>
                          <option value={225}>Starbucks</option>
                          <option value={226}>Test1234</option>
                          <option value={227}>GST Filling</option>
                          <option value={228}>SB100</option>
                          <option value={231}>kkkkkk</option>
                          <option value={232}>test project</option>
                          <option value={233}>DSFSFSDSD</option>
                          <option value={234}>Projekt 1</option>
                          <option value={235}>AAA</option>
                          <option value={236}>Red Ladder Roofing - Live Transfer System</option>
                          <option value={237}>DC</option>
                          <option value={238}>Erte BusinessOne</option>
                          <option value={240}>test</option>
                          <option value={241}>test amirul</option>
                          <option value={244}>ghgjggjh</option>
                          <option value={246}>hgjhg</option>
                          <option value={247}>test</option>
                          <option value={248}>dws</option>
                          <option value={249}>sdasad</option>
                          <option value={250}>sdasd</option>
                          <option value={251}>fdsdfs</option>
                          <option value={252}>Testing</option>
                          <option value={253}>Fencing</option>
                          <option value={254}>Kevin test</option>
                          <option value={255}>my test project cyra</option>
                          <option value={256}>asasaa</option>
                          <option value={257}>ABC</option>
                          <option value={258}>dasdas</option>
                          <option value={259}>Testprojekt</option>
                          <option value={260}>sdfsdfdsf</option>
                          <option value={261}>sdfsdfdsf</option>
                          <option value={262}>Solisten vastleggen</option>
                          <option value={264}>GIVEAWAY PREP</option>
                          <option value={265}>GIVEAWAY PREP</option>
                          <option value={266}>sfsdfsfd</option>
                          <option value={267}>Translations</option>
                          <option value={268}>gjgj</option>
                          <option value={269}>sdcdsfs</option>
                          <option value={270}>Progetto 1</option>
                          <option value={271}>ssd</option>
                          <option value={272}>LH-400</option>
                          <option value={273}>My Project</option>
                          <option value={274}>elsayd</option>
                          <option value={275}>test</option>
                          <option value={276}>xxx</option>
                          <option value={277}>MOKOENA MOKOENA</option>
                          <option value={278}>Demo Project 123</option>
                          <option value={279}>Lead IndiaMart</option>
                          <option value={280}>food</option>
                          <option value={281}>translation of</option>
                          <option value={282}>Website for Music Pop singer</option>
                          <option value={283}>testgm</option>
                          <option value={285}>TZ</option>
                          <option value={286}>test project</option>
                          <option value={287}>demo 1</option>
                          <option value={289}>new Project</option>
                          <option value={290}>MEME</option>
                          <option value={291}>Ad account 1</option>
                          <option value={292}>Sidharth rai reels</option>
                          <option value={293}>CQC REGISTRATION</option>
                          <option value={296}>12345678</option>
                          <option value={297}>Shopify</option>
                          <option value={298}>yutu</option>
                          <option value={299}>seo</option>
                          <option value={301}>seo</option>
                          <option value={302}>asdasd</option>
                          <option value={303}>Demo Project</option>
                          <option value={304}>demo1</option>
                          <option value={305}>first project</option>
                          <option value={306}>split - {'{'}d{'{'}d  -</option>
                          <option value={307}>Ecommerce</option>
                          <option value={308}>test a</option>
                          <option value={309}>test</option>
                          <option value={310}>tes ss</option>
                          <option value={311}>test project mo</option>
                          <option value={312}>SUPRA FIT</option>
                          <option value={313}>SUPRA FIT</option>
                          <option value={314}>Hungary</option>
                          <option value={315}>клиика</option>
                          <option value={316}>BPOM Aja ges</option>
                          <option value={317}>Build Farm Villa in Dubai</option>
                          <option value={320}>E-Commerce Management Laravel with Vue</option>
                          <option value={321}>3ar3our</option>
                          <option value={322}>test</option>
                          <option value={323}>UNIFOM</option>
                          <option value={324}>Sia</option>
                          <option value={327}>Sia</option>
                          <option value={328}>cccc</option>
                          <option value={329}>клиика</option>
                          <option value={330}>AC 2</option>
                          <option value={331}>Testing project</option>
                          <option value={332}>498</option>
                          <option value={333}>MYNEWPRO</option>
                          <option value={334}>sdfsdfsdfsdfsdf</option>
                          <option value={335}>Agile IT Tech DIgital Marketing</option>
                          <option value={336}>digital campaigns</option>
                          <option value={339}>الحرية</option>
                          <option value={340}>test</option>
                          <option value={342}>Para Fins de Teste</option>
                          <option value={344}>Website Development</option>
                          <option value={345}>New UI Implementation</option>
                          <option value={346}>Taskify SaaS CRM</option>
                          <option value={347}>Knowledge John Video App</option>
                          <option value={350}>AI Project on the way</option>
                          <option value={352}>Apple Factory</option>
                          <option value={353}>ok</option>
                          <option value={354}>Hello</option>
                          <option value={358}>Project 1</option>
                          <option value={359}>bully</option>
                          <option value={361}>sd123456</option>
                          <option value={362}>title</option>
                          <option value={363}>Job Portal</option>
                          <option value={364}>Ads HL</option>
                          <option value={365}>GSTR-1</option>
                          <option value={366}>CR</option>
                          <option value={367}>ter</option>
                          <option value={369}>VOLGO</option>
                          <option value={370}>vpn</option>
                          <option value={371}>Inventory Management system</option>
                          <option value={372}>taskify</option>
                          <option value={373}>Amos test</option>
                          <option value={380}>hdhhdhd</option>
                          <option value={381}>testing project</option>
                          <option value={382}>teswt</option>
                          <option value={383}>teswt</option>
                          <option value={384}>paint serives app</option>
                          <option value={385}>Creat POS software</option>
                          <option value={386}>PROYECTO 1</option>
                          <option value={387}>shiva</option>
                          <option value={388}>Visa application</option>
                          <option value={390}>teswt</option>
                          <option value={391}>Site Plan</option>
                          <option value={392}>Northing</option>
                          <option value={393}>rgvrfgrfgb</option>
                          <option value={395}>Reliquias</option>
                          <option value={399}>test</option>
                          <option value={400}>bn</option>
                          <option value={401}>test project 1</option>
                          <option value={403}>COMPRA DE ESPADAS CODIGO BARRA</option>
                          <option value={404}>rgs</option>
                          <option value={405}>DDD</option>
                          <option value={406}>Web Development SAAS</option>
                          <option value={407}>مشروع مادة الرياضيات</option>
                          <option value={408}>GAFD PROJECT</option>
                          <option value={409}>TSM</option>
                          <option value={410}>TSM</option>
                          <option value={411}>Testing Project</option>
                          <option value={412}>EDmS</option>
                          <option value={413}>ahşap stand</option>
                          <option value={414}>I want to eat</option>
                          <option value={415}>Monitoring</option>
                          <option value={416}>Renovation</option>
                          <option value={417}>test</option>
                          <option value={419}>CAM KABİN TEMMUZ</option>
                          <option value={420}>TESTAR</option>
                          <option value={421}>TESTAR 2</option>
                          <option value={423}>PROJECT ACA</option>
                          <option value={424}>Uber Web App Clone</option>
                          <option value={426}>Tour Site</option>
                          <option value={427}>as</option>
                          <option value={429}>dự án 1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row" id="selectTaskUsers">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="user_id">Select Users <span id="users_associated_with_project" /></label>
                      <div className="input-group">
                        <select className="form-control js-example-basic-multiple" name="user_id[]" multiple="multiple" data-placeholder="Type to Search">
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control description" rows={5} name="description" placeholder="Please Enter Description" defaultValue={""} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">Note</label>
                      <textarea className="form-control" name="note" rows={3} placeholder="Optional Note" defaultValue={""} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="edit_task_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <form action="/tasks/update" className="form-submit-event modal-content" method="POST">
                <input type="hidden" name="id" id="id" />
                <input type="hidden" name="dnr" />
                <input type="hidden" name="table" defaultValue="task_table" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Update Task</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
                      <input className="form-control" type="text" id="title" name="title" placeholder="Please Enter Title" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="status">Status <span className="asterisk">*</span></label>
                      <div className="input-group">
                        <select className="form-select statusDropdown" name="status_id" id="task_status_id">
                          <option value={0} data-color="danger" selected>Default (danger)</option>
                          <option value={1} data-color="primary">Started (primary)</option>
                          <option value={2} data-color="info">On Going (info)</option>
                          <option value={59} data-color="warning">In Review (warning)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreateStatusModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create Status"><i className="bx bx-plus" /></button></a>
                        <a href="/status/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Statuses"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Priority</label>
                      <div className="input-group">
                        <select className="form-select" name="priority_id" id="priority_id">
                          <option value={0} className="badge bg-label-secondary" selected>Default (secondary)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreatePriorityModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create priority"><i className="bx bx-plus" /></button></a>
                        <a href="/priority/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Priorities"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="start_date">Starts At <span className="asterisk">*</span></label>
                      <input type="text" id="update_start_date" name="start_date" className="form-control" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="due_date">Ends At <span className="asterisk">*</span></label>
                      <input type="text" id="update_end_date" name="due_date" className="form-control" defaultValue />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label htmlFor="project_title" className="form-label">Project <span className="asterisk">*</span></label>
                      <input className="form-control" type="text" id="update_project_title" readOnly />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="user_id">Select Users <span id="task_update_users_associated_with_project" /></label>
                      <div className="input-group">
                        <select className="form-control js-example-basic-multiple" name="user_id[]" multiple="multiple" data-placeholder="Type to Search">
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control description" id="task_description" rows={5} name="description" placeholder="Please Enter Description" defaultValue={""} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">Note</label>
                      <textarea className="form-control" name="note" rows={3} id="taskNote" placeholder="Optional Note" defaultValue={""} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="confirmUpdateStatusModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Do You Want to Update the Status?</p>
                  <textarea className="form-control" id="statusNote" placeholder="Optional Note" defaultValue={""} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" id="declineUpdateStatus" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirmUpdateStatus">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="confirmUpdatePriorityModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="exampleModalLabel2">Confirm!</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>Do You Want to Update the Priority?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" id="declineUpdatePriority" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" className="btn btn-primary" id="confirmUpdatePriority">Yes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="create_project_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <form action="/projects/store" className="form-submit-event modal-content" method="POST">
                <input type="hidden" name="dnr" />
                <input type="hidden" name="table" defaultValue="projects_table" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Create Project</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
                      <input className="form-control" type="text" name="title" placeholder="Please Enter Title" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="status">Status <span className="asterisk">*</span></label>
                      <div className="input-group">
                        <select className="form-control statusDropdown" name="status_id">
                          <option value={0} data-color="danger" selected>Default (danger)</option>
                          <option value={1} data-color="primary">Started (primary)</option>
                          <option value={2} data-color="info">On Going (info)</option>
                          <option value={59} data-color="warning">In Review (warning)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreateStatusModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create Status"><i className="bx bx-plus" /></button></a>
                        <a href="/status/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Statuses"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Priority</label>
                      <div className="input-group">
                        <select className="form-select" name="priority_id">
                          <option value={0} className="badge bg-label-secondary" selected>Default (secondary)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreatePriorityModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create priority"><i className="bx bx-plus" /></button></a>
                        <a href="/priority/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Priorities"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="budget" className="form-label">Budget</label>
                      <div className="input-group input-group-merge">
                        <span className="input-group-text">₹</span>
                        <input className="form-control" type="text" id="budget" name="budget" placeholder="Please Enter Budget" defaultValue />
                      </div>
                      <span className="text-danger error-message" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="start_date">Starts At <span className="asterisk">*</span></label>
                      <input type="text" id="start_date" name="start_date" className="form-control" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="due_date">Ends At <span className="asterisk">*</span></label>
                      <input type="text" id="end_date" name="end_date" className="form-control" defaultValue />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor>
                        Task Accessibility                            <i className="bx bx-info-circle text-primary" data-bs-toggle="tooltip" data-bs-offset="0,4" data-bs-placement="top" data-bs-html="true" title data-bs-original-title="<b>Assigned Users:</b> You Will Need to Manually Select Task Users When Creating Tasks Under This Project. <br><b>Project Users:</b> When Creating Tasks Under This Project, the Task Users Selection Will Be Automatically Filled With Project Users." />
                      </label>
                      <div className="input-group">
                        <select className="form-select" name="task_accessibility">
                          <option value="assigned_users">Assigned Users</option>
                          <option value="project_users">Project Users</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="user_id">Select Users</label>
                      <div className="input-group">
                        <select className="form-control js-example-basic-multiple" name="user_id[]" multiple="multiple" data-placeholder="Type to Search">
                          <option value={7} selected>Admin Infinitie</option>
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
                          <option value={109}>бабораб gfhf</option>
                          <option value={110}>da ad</option>
                          <option value={111}>asdf asd</option>
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
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="client_id">Select Clients</label>
                      <div className="input-group">
                        <select className="form-control js-example-basic-multiple" name="client_id[]" multiple="multiple" data-placeholder="Type to Search">
                          <option value={66}>client Two</option>
                          <option value={78}>Client One</option>
                          <option value={79}>saifullah muhamad</option>
                          <option value={80}>Nithin Viswanathan</option>
                          <option value={81}>Kellan Ashford</option>
                          <option value={86}>Johnathan Doe</option>
                          <option value={87}>Shiva Prasad</option>
                          <option value={88}>Dhananjay User</option>
                          <option value={90}>Sanjay Soni</option>
                          <option value={91}>Diego Mau</option>
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
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor>Select Tags</label>
                      <div className="input-group">
                        <select className="form-control tagsDropdown" name="tag_ids[]" multiple="multiple" data-placeholder="Type to Search">
                          <option value={6} data-color="primary">Web Development</option>
                          <option value={7} data-color="secondary">E-commerce</option>
                          <option value={8} data-color="success">Social Networking</option>
                          <option value={9} data-color="danger">Content Management</option>
                          <option value={10} data-color="warning">Project Management</option>
                          <option value={11} data-color="info">Learning and Education</option>
                          <option value={12} data-color="dark">Booking and Reservation</option>
                          <option value={22} data-color="success">abc</option>
                          <option value={23} data-color="secondary">prueba</option>
                          <option value={24} data-color="primary">pROJECT CONTENT</option>
                          <option value={25} data-color="primary">PD</option>
                          <option value={26} data-color="info">BE</option>
                          <option value={27} data-color="primary">LE</option>
                          <option value={28} data-color="primary">Renewal</option>
                          <option value={29} data-color="primary">Live Transfer Implementation</option>
                          <option value={30} data-color="secondary">gccgcfgh</option>
                          <option value={31} data-color="danger">111</option>
                          <option value={32} data-color="secondary">eee</option>
                          <option value={33} data-color="primary">Hh</option>
                          <option value={34} data-color="dark">Villa</option>
                          <option value={35} data-color="success">Koha</option>
                          <option value={36} data-color="secondary">sdfsd</option>
                          <option value={37} data-color="primary">From</option>
                          <option value={38} data-color="danger">as</option>
                          <option value={39} data-color="secondary">test</option>
                          <option value={40} data-color="primary">Digital Design</option>
                          <option value={41} data-color="success">Test</option>
                          <option value={42} data-color="danger">bb</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreateTagModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create Tag"><i className="bx bx-plus" /></button></a>
                        <a href="/tags/manage"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Tags"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control description" rows={5} name="description" placeholder="Please Enter Description" defaultValue={""} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">Note</label>
                      <textarea className="form-control" name="note" rows={3} placeholder="Optional Note" defaultValue={""} />
                    </div>
                  </div>
                  <div className="alert alert-primary" role="alert">
                    You Will Be Project Participant Automatically              </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="edit_project_modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <form action="/projects/update" className="form-submit-event modal-content" method="POST">
                <input type="hidden" name="id" id="project_id" />
                <input type="hidden" name="dnr" />
                <input type="hidden" name="table" defaultValue="projects_table" />
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">Update Project</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <input type="hidden" name="_token" defaultValue="I99KP3IgGnRieAthdS2LgDXTbjnwU7VvmCbuscZA" autoComplete="off" />            <div className="modal-body">
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
                      <input className="form-control" type="text" name="title" id="project_title" placeholder="Please Enter Title" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="status">Status <span className="asterisk">*</span></label>
                      <div className="input-group">
                        <select className="form-control statusDropdown" name="status_id" id="project_status_id">
                          <option value={0} data-color="danger" selected>Default (danger)</option>
                          <option value={1} data-color="primary">Started (primary)</option>
                          <option value={2} data-color="info">On Going (info)</option>
                          <option value={59} data-color="warning">In Review (warning)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreateStatusModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create Status"><i className="bx bx-plus" /></button></a>
                        <a href="/status/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Statuses"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Priority</label>
                      <div className="input-group">
                        <select className="form-select" name="priority_id" id="project_priority_id">
                          <option value={0} className="badge bg-label-secondary" selected>Default (secondary)</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreatePriorityModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create priority"><i className="bx bx-plus" /></button></a>
                        <a href="/priority/manage" target="_blank"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Priorities"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="budget" className="form-label">Budget</label>
                      <div className="input-group input-group-merge">
                        <span className="input-group-text">₹</span>
                        <input className="form-control" type="text" id="project_budget" name="budget" placeholder="Please Enter Budget" defaultValue />
                      </div>
                      <span className="text-danger error-message" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="start_date">Starts At <span className="asterisk">*</span></label>
                      <input type="text" id="update_start_date" name="start_date" className="form-control" defaultValue />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="due_date">Ends At <span className="asterisk">*</span></label>
                      <input type="text" id="update_end_date" name="end_date" className="form-control" defaultValue />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor>
                        Task Accessibility                            <i className="bx bx-info-circle text-primary" data-bs-toggle="tooltip" data-bs-offset="0,4" data-bs-placement="top" data-bs-html="true" title data-bs-original-title="<b>Assigned Users:</b> You Will Need to Manually Select Task Users When Creating Tasks Under This Project.<br><b>Project Users:</b> When Creating Tasks Under This Project, the Task Users Selection Will Be Automatically Filled With Project Users." />
                      </label>
                      <div className="input-group">
                        <select className="form-select" name="task_accessibility" id="task_accessibility">
                          <option value="assigned_users">Assigned Users</option>
                          <option value="project_users">Project Users</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="user_id">Select Users</label>
                      <div className="input-group">
                        <select className="form-control js-example-basic-multiple" name="user_id[]" multiple="multiple" data-placeholder="Type to Search">
                          <option value={7} selected>Admin Infinitie</option>
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
                          <option value={109}>бабораб gfhf</option>
                          <option value={110}>da ad</option>
                          <option value={111}>asdf asd</option>
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
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="client_id">Select Clients</label>
                      <div className="input-group">
                        <select className="form-control js-example-basic-multiple" name="client_id[]" multiple="multiple" data-placeholder="Type to Search">
                          <option value={66}>client Two</option>
                          <option value={78}>Client One</option>
                          <option value={79}>saifullah muhamad</option>
                          <option value={80}>Nithin Viswanathan</option>
                          <option value={81}>Kellan Ashford</option>
                          <option value={86}>Johnathan Doe</option>
                          <option value={87}>Shiva Prasad</option>
                          <option value={88}>Dhananjay User</option>
                          <option value={90}>Sanjay Soni</option>
                          <option value={91}>Diego Mau</option>
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
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor>Select Tags</label>
                      <div className="input-group">
                        <select className="form-control tagsDropdown" name="tag_ids[]" multiple="multiple" data-placeholder="Type to Search">
                          <option value={6} data-color="primary">Web Development</option>
                          <option value={7} data-color="secondary">E-commerce</option>
                          <option value={8} data-color="success">Social Networking</option>
                          <option value={9} data-color="danger">Content Management</option>
                          <option value={10} data-color="warning">Project Management</option>
                          <option value={11} data-color="info">Learning and Education</option>
                          <option value={12} data-color="dark">Booking and Reservation</option>
                          <option value={22} data-color="success">abc</option>
                          <option value={23} data-color="secondary">prueba</option>
                          <option value={24} data-color="primary">pROJECT CONTENT</option>
                          <option value={25} data-color="primary">PD</option>
                          <option value={26} data-color="info">BE</option>
                          <option value={27} data-color="primary">LE</option>
                          <option value={28} data-color="primary">Renewal</option>
                          <option value={29} data-color="primary">Live Transfer Implementation</option>
                          <option value={30} data-color="secondary">gccgcfgh</option>
                          <option value={31} data-color="danger">111</option>
                          <option value={32} data-color="secondary">eee</option>
                          <option value={33} data-color="primary">Hh</option>
                          <option value={34} data-color="dark">Villa</option>
                          <option value={35} data-color="success">Koha</option>
                          <option value={36} data-color="secondary">sdfsd</option>
                          <option value={37} data-color="primary">From</option>
                          <option value={38} data-color="danger">as</option>
                          <option value={39} data-color="secondary">test</option>
                          <option value={40} data-color="primary">Digital Design</option>
                          <option value={41} data-color="success">Test</option>
                          <option value={42} data-color="danger">bb</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <a href="javascript:void(0);" className="openCreateTagModal"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title=" Create Tag"><i className="bx bx-plus" /></button></a>
                        <a href="/tags/manage"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Manage Tags"><i className="bx bx-list-ul" /></button></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control description" rows={5} name="description" id="project_description" placeholder="Please Enter Description" defaultValue={""} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">Note</label>
                      <textarea className="form-control" name="note" id="projectNote" rows={3} placeholder="Optional Note" defaultValue={""} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                  <button type="submit" id="submit_btn" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal fade" id="quickViewModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1"><span id="typePlaceholder" /> Quick View</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <h5 id="quickViewTitlePlaceholder" className="text-muted" />
                  <div className="nav-align-top">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-quick-view-users" aria-controls="navs-top-quick-view-users">
                          <i className="menu-icon tf-icons bx bx-group text-primary" />Users                          </button>
                      </li>
                      <li className="nav-item">
                        <button type="button" className="nav-link " role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-quick-view-clients" aria-controls="navs-top-quick-view-clients">
                          <i className="menu-icon tf-icons bx bx-group text-warning" />Clients                          </button>
                      </li>
                      <li className="nav-item">
                        <button type="button" className="nav-link " role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-quick-view-description" aria-controls="navs-top-quick-view-description">
                          <i className="menu-icon tf-icons bx bx-notepad text-success" />Description                          </button>
                      </li>
                    </ul>
                    <input type="hidden" id="type" />
                    <input type="hidden" id="typeId" />
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="navs-top-quick-view-users" role="tabpanel">
                        <div className="table-responsive text-nowrap">
                          {/* <input type="hidden" id="data_type" value="users">
                            <input type="hidden" id="data_table" value="usersTable"> */}
                          <table id="usersTable" data-toggle="table" data-loading-template="loadingTemplate" data-url="/users/list" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="id" data-sort-order="desc" data-mobile-responsive="true" data-query-params="queryParamsUsersClients">
                            <thead>
                              <tr>
                                <th data-checkbox="true" />
                                <th data-sortable="true" data-field="id">ID</th>
                                <th data-formatter="userFormatter" data-sortable="true" data-field="first_name">Users</th>
                                <th data-field="role">Role</th>
                                <th data-field="phone" data-sortable="true" data-visible="false">Phone Number</th>
                                <th data-field="assigned">Assigned</th>
                                <th data-sortable="true" data-field="created_at" data-visible="false">Created At</th>
                                <th data-sortable="true" data-field="updated_at" data-visible="false">Updated At</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane fade " id="navs-top-quick-view-clients" role="tabpanel">
                        <div className="table-responsive text-nowrap">
                          {/* <input type="hidden" id="data_type" value="clients">
                        <input type="hidden" id="data_table" value="clientsTable"> */}
                          <table id="clientsTable" data-toggle="table" data-loading-template="loadingTemplate" data-url="/clients/list" data-icons-prefix="bx" data-icons="icons" data-show-refresh="true" data-total-field="total" data-trim-on-search="false" data-data-field="rows" data-page-list="[5, 10, 20, 50, 100, 200]" data-search="true" data-side-pagination="server" data-show-columns="true" data-pagination="true" data-sort-name="id" data-sort-order="desc" data-mobile-responsive="true" data-query-params="queryParamsUsersClients">
                            <thead>
                              <tr>
                                <th data-checkbox="true" />
                                <th data-sortable="true" data-field="id">ID</th>
                                <th data-formatter="clientFormatter" data-sortable="true">Client</th>
                                <th data-field="company" data-sortable="true" data-visible="false">Company</th>
                                <th data-field="phone" data-sortable="true" data-visible="false">Phone Number</th>
                                <th data-field="assigned">Assigned</th>
                                <th data-sortable="true" data-field="created_at" data-visible="false">Created At</th>
                                <th data-sortable="true" data-field="updated_at" data-visible="false">Updated At</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane fade " id="navs-top-quick-view-description" role="tabpanel">
                        <p className="pt-3" id="quickViewDescPlaceholder" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close              </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="createWorkspaceModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Workspace</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <form action="workspaces/store" className="form-submit-event" method="POST">
                  <input type="hidden" name="dnr" />
                  <div className="modal-body">
                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
                        <input className="form-control" type="text" id="title" name="title" placeholder="Please Enter Title" defaultValue />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="user_ids[]">Select Users</label>
                        <div className="input-group">
                          <select className="form-control js-example-basic-multiple" name="user_ids[]" multiple="multiple" data-placeholder="Type to Search">
                            <option value={7} selected>Admin Infinitie</option>
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
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="client_ids[]">Select Clients</label>
                        <div className="input-group">
                          <select className="form-control js-example-basic-multiple" name="client_ids[]" multiple="multiple" data-placeholder="Type to Search">
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
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <div className="form-check form-switch">
                          <label className="form-check-label" htmlFor="primaryWorkspace">
                            <input className="form-check-input" type="checkbox" name="primaryWorkspace" id="primaryWorkspace" />
                            Primary Workspace?
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="alert alert-primary alert-dismissible" role="alert">
                      You Will Be Workspace Participant Automatically                  </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" id="submit_btn" className="btn btn-primary">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal fade" id="editWorkspaceModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Workspace</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <form action="workspaces/update" className="form-submit-event" method="POST">
                  <input type="hidden" name="id" id="workspace_id" />
                  <input type="hidden" name="dnr" />
                  <div className="modal-body">
                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title <span className="asterisk">*</span></label>
                        <input className="form-control" type="text" name="title" id="workspace_title" placeholder="Please Enter Title" defaultValue />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="user_ids[]">Select Users</label>
                        <div className="input-group">
                          <select className="form-control js-example-basic-multiple" name="user_ids[]" multiple="multiple" data-placeholder="Type to Search">
                            <option value={7} selected>Admin Infinitie</option>
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
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="client_ids[]">Select Clients</label>
                        <div className="input-group">
                          <select className="form-control js-example-basic-multiple" name="client_ids[]" multiple="multiple" data-placeholder="Type to Search">
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
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3">
                        <div className="form-check form-switch">
                          <label className="form-check-label" htmlFor="updatePrimaryWorkspace">
                            <input className="form-check-input" type="checkbox" name="primaryWorkspace" id="updatePrimaryWorkspace" />
                            Primary Workspace?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" id="submit_btn" className="btn btn-primary">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    
  )
}

export default Dashboard
