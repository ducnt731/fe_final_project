import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { addCinema, deleteCinema, editCinema, fetchAllCinema } from "../../service/userService"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AddCinema from "./addCinema";
import EditCinema from "./editCinema";
import DeleteCinema from "./deleteCinema";
import { RiArrowUpDownLine } from "react-icons/ri";

const MangageCinema = () => {
    const [isShowModalAdd, setIsShowModalAdd] = useState(0)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [totalPages, setTotalPage] = useState(0);
    const [listCinema, setlistCinema] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const accountsPerPage = 10// Số tài khoản trên mỗi trang
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate()

    // const [isSearching, setIsSearching] = useState(false);

    const handleClose = () => {
        setIsShowModalAdd(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleEdit = (cinemaEdit) => {
        setDataEdit(cinemaEdit)
        setIsShowModalEdit(true)
    }
    const handleDelete = (cinemaDelete) => {
        setIsShowModalDelete(true)
        setDataDelete(cinemaDelete)
    }
    const handleEditFromModal = async (dataEdit) => {
        const id = dataEdit._id;
        let newData = dataEdit;
        delete newData.__v;
        delete newData._id;
        newData = { ...newData, id };
        try {
            const response = await editCinema(newData);
            console.log("check?>>>>>>", response)
            if (response.data && response.data.success) {
                await getAllCinema()
                setIsShowModalEdit(!isShowModalEdit)
                toast.success("Edit success!")
            }
        } catch (error) {
            toast.error("Edit error")
        }
    }
    const handleDeleteFromModal = async (dataEdit) => {
        try {
            const response = await deleteCinema(dataEdit._id);
            if (response) {
                await getAllCinema()
                setIsShowModalDelete(!isShowModalDelete)
                toast.success("Delete successful!!!")
            }
        } catch (error) {
            toast.error("Delete error")
        }
    }
    const getAllCinema = async () => {
        try {
            // const response = await fetchAllmovie();
            const response = await fetchAllCinema(currentPage, accountsPerPage);
            if (response) {
                setTotalPage(response.totalPages);
                setlistCinema(response.data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleAddCinema = async (cinemaData) => {
        if (!cinemaData.name || !cinemaData.province || !cinemaData.district || !cinemaData.commune || !cinemaData.address) {
            toast.error("All fields must be filled.");
            return; // Stop the function if any field is missing
        }

        try {
            const response = await addCinema(cinemaData);
            if (response.status) {
                await getAllCinema();
                toast.warn(response.data.message)
                await getAllCinema()
                setIsShowModalAdd(!isShowModalAdd)
            } else {
                toast.success("Add sucessful!!!")
                await getAllCinema()
                setIsShowModalAdd(!isShowModalAdd)
            }
        } catch (error) {
            toast.error(error.response.message);
        }
    }
    useEffect(() => {
        getAllCinema();
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
        const sorted = [...listCinema];
        // Sắp xếp mảng sorted dựa trên trạng thái sắp xếp hiện tại
        sorted.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);; // Sắp xếp tăng dần
            } else {
                return b.name.localeCompare(a.name); // Sắp xếp giảm dần
            }
        });
        // Cập nhật items state với mảng đã sắp xếp
        setlistCinema(sorted);
        // Đảo ngược trạng thái sắp xếp để sử dụng cho lần nhấp tiếp theo
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    return (
        <>
            <div className="account-container">
                <div className="account-list">
                    <div className="button-account">
                        <h2>All Cinema</h2>
                        <div className="button-cinema">
                            <button
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
                                    <th className="sort-table">Name
                                        <div className="sort">
                                            <RiArrowUpDownLine onClick={handleSort} />
                                        </div>
                                    </th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listCinema && listCinema.length > 0 &&
                                    listCinema.map((item, index) => {
                                        console.log("???>>>>>>", item);
                                        return (
                                            <tr key={`movies-${index}`}>
                                                <td>{item.name}</td>
                                                <td>{item.address}, {item.commune}, {item.district}, {item.province} </td>
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
            <AddCinema
                show={isShowModalAdd}
                handleClose={handleClose}
                handleAddNewCinema={handleAddCinema}
            />
            <EditCinema
                show={isShowModalEdit}
                dataEditCinema={dataEdit}
                handleClose={handleClose}
                handleEditCinema={handleEditFromModal}
            />
            <DeleteCinema
                show={isShowModalDelete}
                handleClose={handleClose}
                dataCinemaDelete={dataDelete}
                handleCinemaDelete={handleDeleteFromModal}
            />
        </>
    )
}

export default MangageCinema