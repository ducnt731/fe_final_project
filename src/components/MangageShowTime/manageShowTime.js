import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { addShowTime, deleteShowTime, editShowTime, fetchAllShowTime } from "../../service/userService"
import { toast } from 'react-toastify';
import { RiArrowUpDownLine } from "react-icons/ri";
import AddShowTime from "./addShowTime";
import EditShowTime from "./editShowTime";
import DeleteShowTime from "./deleteShowTime";
import { formatDate } from '../../service/formatDate';
import ShowTimeSchedule from "../scheduleShowTime/schedule";
import { useNavigate } from "react-router-dom";

const MangageShowTime = () => {

    const [isShowModalAdd, setIsShowModalAdd] = useState(0)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [totalPages, setTotalPage] = useState(0);
    const [listShowTime, setlistShowTime] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const accountsPerPage = 10// Số tài khoản trên mỗi trang
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate()
    // const [searchShowTime, setsearchShowTime] = useState('');
    // const [isSearching, setIsSearching] = useState(false);

    const handleClose = () => {
        setIsShowModalAdd(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleEdit = (accountEdit) => {
        setDataEdit(accountEdit)
        setIsShowModalEdit(true)
    }
    const handleDelete = (accountDelete) => {
        setIsShowModalDelete(true)
        setDataDelete(accountDelete)
    }
    const handleEditFromModal = async (dataEdit) => {
        console.log(">>>>>>>>>>Dataa", dataEdit)
        const id = dataEdit._id
        let newData = dataEdit
        delete newData.__v
        delete newData._id
        newData = { ...newData, id }
        try {
            const response = await editShowTime(newData);
            if (response) {
                await getAllShowTime()
                setIsShowModalEdit(!isShowModalEdit)
                toast.success("Edit schedule success!!!")
            }
        } catch (error) {
            toast.error("Edit schedule error!!!")
        }
    }
    const handleDeleteFromModal = async (dataEdit) => {
        try {
            const response = await deleteShowTime(dataEdit._id);
            if (response) {
                await getAllShowTime()
                setIsShowModalDelete(!isShowModalDelete)
                toast.success("Delete schedule success!!!")
            }
        } catch (error) {
            toast.error("Delete schedule error!!!")
        }
    }
    const getAllShowTime = async () => {
        try {
            // const response = await fetchAllmovie();
            const response = await fetchAllShowTime(currentPage, accountsPerPage);
            if (response) {
                setTotalPage(response.totalPages);
                setlistShowTime(response.data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleAddShowTime = async (showTimeData) => {
        try {
            const response = await addShowTime(showTimeData);
            console.log(">>> check", response);
            if (response.data) {
                await getAllShowTime()
                setIsShowModalAdd(!isShowModalAdd)
                toast.success("Create new schedule success!!!")
            } else {
                toast.warn("You need to enter all field!!!")
            }
        } catch (error) {
            toast.error("Create schedule fail")
        }
    }
    useEffect(() => {
        getAllShowTime();
    }, [currentPage]);

    const renderPages = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li className="page-item" key={i}>
                    <a className="page-link" href="#" onClick={() => handlePageChange(i)}>{i}</a>
                </li>
            );
        }
        // if (isSearching) {
        //     return null
        // } else {
        return pages;
        // }

    }

    const handleSort = () => {
        // Sao chép mảng items để không làm thay đổi mảng gốc
        const sorted = [...listShowTime];
        // Sắp xếp mảng sorted dựa trên trạng thái sắp xếp hiện tại
        sorted.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);; // Sắp xếp tăng dần
            } else {
                return b.name.localeCompare(a.name); // Sắp xếp giảm dần
            }
        });
        // Cập nhật items state với mảng đã sắp xếp
        setlistShowTime(sorted);
        // Đảo ngược trạng thái sắp xếp để sử dụng cho lần nhấp tiếp theo
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }


    return (
        <>
            <div className="account-container">
                <div className="account-list">
                    <div className="button-account">
                        <h2>All Show Time</h2>
                        <div className="button-ShowTime">
                            <a href="/admin/schedule" className="btn btn-primary">Schedule</a>
                            <button
                                style={{ marginLeft: "10px" }}
                                className="btn btn-primary"
                                onClick={() => setIsShowModalAdd(true)
                                }
                            >Add new</button>
                        </div>

                    </div>
                    <div className="table-account" style={{ backgroundColor: "white", borderRadius: "10px", marginTop: "10px", boxShadow: "0 0 0px #b8bec4", padding: "5px" }}>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th className="sort-table">Movie
                                        <div className="sort">
                                            <RiArrowUpDownLine onClick={handleSort} />
                                        </div>
                                    </th>
                                    <th>Cinema</th>
                                    <th>Room</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listShowTime && listShowTime.length > 0 &&
                                    listShowTime.map((item, index) => {
                                        return (
                                            <tr key={`movies-${index}`}>
                                                <td>{item.movie?.name}</td>
                                                <td>{item.cinema?.name}</td>
                                                <td>{item.room?.name}</td>
                                                <td>{formatDate(new Date(item.startDate))}</td>
                                                <td>{formatDate(new Date(item.endDate))}</td>
                                                <td>
                                                    <div className="button-action">
                                                        <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    <nav aria-label="me-3">
                        <ul className="pagination justify-content-end">
                            {renderPages()}
                        </ul>
                    </nav>
                </div>
            </div>
            <AddShowTime
                show={isShowModalAdd}
                handleClose={handleClose}
                handleAddNewShowTime={handleAddShowTime}
            />
            <EditShowTime
                show={isShowModalEdit}
                dataEditShowTime={dataEdit}
                handleClose={handleClose}
                handleEditShowTime={handleEditFromModal}
            />
            <DeleteShowTime
                show={isShowModalDelete}
                handleClose={handleClose}
                dataShowTimeDelete={dataDelete}
                handleShowTimeDelete={handleDeleteFromModal}
            />
        </>
    )
}

export default MangageShowTime