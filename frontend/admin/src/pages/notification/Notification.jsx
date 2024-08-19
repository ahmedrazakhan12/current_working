import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Notification = () => {
    const [currentItems, setCurrentItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications(currentPage);
    }, [currentPage]);

    const fetchNotifications = (page) => {
        axios.get(`http://localhost:5000/notify/getNotificationAll/${localStorage.getItem("id")}?page=${page}&limit=10`)
            .then((res) => {
                setCurrentItems(res.data.data);
                setTotalItems(res.data.totalItems);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function formatTime(datetimeString) {
        let dateObj = new Date(datetimeString);
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    function extractDate(datetimeString) {
        let dateObj = new Date(datetimeString);
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        return `${month}/${day}/${year}`;
    }

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1; // react-paginate uses zero-based index
        setCurrentPage(selectedPage);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div
                            style={{ borderRadius: "6px" }}
                            className="card-body p-3 bg-white mt-4 shadow blur border-radius-lg"
                        >
                            <h4 className='mx-3'>Notifications</h4>
                            <div className="table-responsive p-2">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Notification</th>
                                            <th style={{ textAlign: "center" }}>Time</th>
                                            <th style={{ textAlign: "center" }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * 10 + index + 1}</td>
                                                <td onClick={() => navigate(item.route)}>
                                                    <p className="text-xs font-weight-bold mb-0 cursor-pointer text-capitalize" style={{ fontSize: "15px" }}>
                                                        <b> {item.text}</b>
                                                    </p>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <span className={"badge bg-primary me-1"} style={{ fontSize: "12px", textAlign: "center" }}>
                                                        {formatTime(item.time)}
                                                    </span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0" style={{ fontSize: "15px" }}>
                                                        {extractDate(item.time)}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                        {currentItems.length === 0 && (
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: "center" }}>
                                                    <p className="text-xs font-weight-bold mb-0" style={{ fontSize: "15px" }}>
                                                        No Notifications yet!
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    previousLabel={<i class='bx bx-chevron-left' ></i>}
                                    nextLabel={<i class='bx bx-chevron-right'></i>}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
