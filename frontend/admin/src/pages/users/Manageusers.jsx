import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
const Manageusers = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust items per page as needed
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/team")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching providers:", err);
      });
  }, []);

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



  
  const handleUserDelete = (id) => {
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/admin/delete/${id}`)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              title: "User deleted successfully",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "custom-swal",
              },
            }).then(() => {
              navigate("/manageUsers");
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

  }


  return (
    <>
      <div className="container">
        <div
          className="card-body px-0 pt-0 pt-2 pl-2 pb-1 pe-2 bg-white mt-4 shadow blur border-radius-lg"
          
        >
          <div className="table-responsive p-2">
            <div
              className="pt-2 pb-2"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="input-group p-0 w-20">
                <span className="input-group-text text-body">
                  <i className="bx bx-search" aria-hidden="true" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type here..."
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <table
                id="table"
                data-toggle="table"
                data-loading-template="loadingTemplate"
                data-url="https://taskify.taskhub.company/users/list"
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
                className="table table-bordered table-hover"
              >
                <thead>
                  <tr>
                    <th
                      className="bs-checkbox "
                      style={{ width: 36 }}
                      data-field={0}
                    >
                      <div className="th-inner ">
                        <label>
                          <input name="btSelectAll" type="checkbox" />
                          <span />
                        </label>
                      </div>
                      <div className="fht-cell" />
                    </th>
                    <th style={{}} data-field="id">
                      <div className="th-inner sortable both">ID</div>
                      <div className="fht-cell" />
                    </th>
                    <th style={{}} data-field="profile">
                      <div className="th-inner ">Users</div>
                      <div className="fht-cell" />
                    </th>
                    <th style={{textAlign:"center"}} data-field="role">
                      <div className="th-inner ">Role</div>
                      <div className="fht-cell" />
                    </th>
                    <th style={{textAlign:"center"}} data-field="phone">
                      <div className="th-inner sortable both desc">
                        Phone Number
                      </div>
                      <div className="fht-cell" />
                    </th>
                    <th style={{textAlign:"center"}} data-field="assigned">
                      <div className="th-inner ">Assigned</div>
                      <div className="fht-cell" />
                    </th>
                    <th style={{textAlign:"center"}} data-field="actions">
                      <div className="th-inner ">Actions</div>
                      <div className="fht-cell" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} >
                    <td className="bs-checkbox " style={{ width: 36 }}>
                      <label>
                        <input
                          data-index={0}
                          name="btSelectItem"
                          type="checkbox"
                        />
                        <span />
                      </label>
                    </td>
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
                              style={{ objectFit: "cover"  , borderRadius:'5px'}}
                            />
                          </Link>
                        </div>
                        <div className="mx-2">
                          <h6 className="mb-1 text-capitalize">
                            {item.name}{" "}
                            {/* <span className="badge bg-success">Active</span> */}
                          </h6>
                          <p className="text-muted  " style={{fontSize:'14px' , marginTop:'-4px'}}>{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{textAlign:'center'}}>
                      <span className="badge bg-label-info me-1" style={{fontSize:'12px' , textAlign:'center'}}>
                        {item.role}
                      </span>
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0"  style={{fontSize:'15px'}}>
                          {item.contact}
                        </p>
                    </td> 
                    <td >
                      <div className="d-flex " style={{textAlign:"center"}} >
                        <div className="mx-4" style={{textAlign:"center"}} >
                    
                            <span className="badge rounded-pill bg-primary"  style={{fontSize:'12px'}}>
                              216
                            </span>
                         
                          <div  style={{fontSize:'12px'}}>Projects</div>
                        </div>
                        <div  >
                       
                            <span className="badge rounded-pill bg-primary"  style={{fontSize:'12px'}}>
                              355
                            </span>
                          
                          <div  style={{fontSize:'12px'}}>Tasks</div>
                        </div>
                      </div>
                    </td>
                    <td  style={{textAlign:"center"}} >
                      <Link
                        to={`/editusers/${item.id}`}
                      >
                        <i className="bx bx-edit mx-1" />
                      </Link>
                      <button
                        title="Delete"
                        type="button"
                        className="btn delete"
                        data-id={7}
                        data-type="users"
                        onClick={()=>handleUserDelete(item.id)}
                        fdprocessedid="p9v6t"
                      >
                        <i className="bx bx-trash text-danger mx-1" />
                      </button>
                    </td>
                  </tr>
                ))}
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
                            ? " text-light text-xs font-weight-bold"
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
    </>
  );
};

export default Manageusers;
