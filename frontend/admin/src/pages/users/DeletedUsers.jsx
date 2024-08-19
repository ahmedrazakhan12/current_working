import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const DeletedUsers = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust items per page as needed
  const navigate = useNavigate();
  const fetchData = () => {
    axios
      .get("http://localhost:5000/admin/deletedTeam")
      .then((res) => {
        console.log(res.data);
        setData(res.data.admins);
      })
      .catch((err) => {
        console.log("Error fetching providers:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeId = localStorage.getItem("id");
  const [loggedInData, setLoggedInData] = useState([]);
  useEffect(() => {
    if (!activeId) {
      navigate("/login"); // Redirect to login
    } else {
      axios
        .get(`http://localhost:5000/admin/adminInfo/`, {
          headers: { Authorization: `${activeId}` },
        })
        .then((res) => {
          setLoggedInData(res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/login"); // Redirect to login on 404
          }
        });
    }

   
  }, [activeId]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    axios
      .get(`http://localhost:5000/admin/search/${searchTerm}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error searching providers:", err);
      });
  };

  // Pagination handling
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Next page handler
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate current items to display based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleUserRestore = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to restore this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/admin/restore/${id}`)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              title: "User restored successfully",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "custom-swal",
              },
            }).then(() => {
              fetchData(); // Fetch data again to update the table
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <>
       <div className="container-fluid">
       <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div
              style={{ borderRadius: "6px" }}
              className="card-body p-3  bg-white mt-4 shadow blur border-radius-lg"
            >
              <div className="table-responsive p-2">
                {/* <div
                  className="pt-2 pb-2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div class="searchbar">
                    <div class="searchbar-wrapper">
                      <div class="searchbar-left">
                        <div class="search-icon-wrapper">
                          <span class="search-icon searchbar-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div class="searchbar-center">
                        <div class="searchbar-input-spacer"></div>

                        <input
                          type="text"
                          class="searchbar-input"
                          onChange={handleSearchChange}
                          maxlength="2048"
                          name="q"
                          autocapitalize="off"
                          autocomplete="off"
                          title="Search"
                          role="combobox"
                          placeholder="Search user"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                <h5>Deleted Users</h5>
                <table id="table" className="table table-bordered ">
                  <thead>
                    <tr>
                      <th style={{}} data-field="id">
                        <div className="th-inner sortable both">ID</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{}} data-field="profile">
                        <div className="th-inner ">Users</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="role">
                        <div className="th-inner ">Role</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="phone">
                        <div className="th-inner sortable both desc">
                          Phone Number
                        </div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="assigned">
                        <div className="th-inner ">Assigned</div>
                        <div className="fht-cell" />
                      </th>
                      <th style={{ textAlign: "center" }} data-field="actions">
                        <div className="th-inner ">Actions</div>
                        <div className="fht-cell" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex mt-2">
                            <div
                              className="avatar avatar-md pull-up"
                              title="Admin Infinitie"
                            >
                              <Link to={`/Userview/${item.id}`}>
                                <img
                                  src={item.pfpImage}
                                  alt="Avatar"
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="mx-2">
                              <h6 className="mb-1 text-capitalize">
                                {item.name}{" "}
                                {/* <span className="badge bg-success">Active</span> */}
                              </h6>
                              <p
                                className="text-muted  "
                                style={{ fontSize: "14px", marginTop: "-4px" }}
                              >
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span
                            className={
                              item.role === "super-admin"
                                ? "badge bg-success me-1"
                                : "badge bg-primary me-1"
                            }
                            style={{ fontSize: "12px", textAlign: "center" }}
                          >
                            {item.role}
                          </span>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <p
                            className="text-xs font-weight-bold mb-0"
                            style={{ fontSize: "15px" }}
                          >
                            +{item.contact}
                          </p>
                        </td>
                        <td>
                          <div className="d-flex " style={{ textAlign: "center" }}>
                            <div className="mx-4" style={{ textAlign: "center" }}>
                              <span
                                className="badge rounded-pill bg-primary"
                                style={{ fontSize: "12px" }}
                              >
                                  {item.projectCount}
                              </span>

                              <div style={{ fontSize: "12px" }}>Projects</div>
                            </div>
                            <div>
                              <span
                                className="badge rounded-pill bg-primary"
                                style={{ fontSize: "12px" }}
                              >
                                {item.taskCount}
                              </span>

                              <div style={{ fontSize: "12px" }}>Tasks</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {loggedInData.id !== item.id ? (
                            <>
                            
                          <button
                            title="Delete"
                            type="button"
                            style={{
                              border: "none",
                              background: "none",
                              margin: "0",
                            }}
                            onClick={() => handleUserRestore(item.id)}
                          >
                                 <FontAwesomeIcon icon={faArrowsRotate} style={{color:"green"}}/>

                          </button>
                          </>
                          ) : ('----')}
                         
                        </td>
                      </tr>
                    ))}

                    {currentItems.length === 0 && (
                       <tr>
                        <td colSpan={6} className="text-center">No data found.</td>
                       </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination className="mt-3 justify-content-center ">
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

                {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
                  (number) => {
                    // Limit pagination items to maximum of 10
                    if (
                      number < currentPage + 5 &&
                      number >= currentPage - 4 &&
                      number + 1 <= Math.ceil(data.length / itemsPerPage)
                    ) {
                      return (
                        <Pagination.Item
                          key={number + 1}
                          active={number + 1 === currentPage}
                          onClick={() => paginate(number + 1)}
                        >
                          <span
                            className={
                              number === currentPage - 1
                                ? " text-white text-xs font-weight-bold"
                                : "text-dark text-xs font-weight-bold"
                            }
                          >
                            {number + 1}
                          </span>
                        </Pagination.Item>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
                <Pagination.Next
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </div>
      </div>
       </div>
    </>
  );
};

export default DeletedUsers;
