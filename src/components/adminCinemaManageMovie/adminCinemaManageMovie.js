import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../../style/manageAccounts.css"
import AdminCinemaEditMovie from "./adCinemaEditMovie";
import AdminCinemaAddMovie from "./adCinemaAddMovie";
import AdminCinemaDeleteMovie from "./adCinemaDeleteMovie";
import { toast } from 'react-toastify';
import { RiArrowUpDownLine } from "react-icons/ri";
import Form from 'react-bootstrap/Form';
import { formatDate } from '../../service/formatDate';
import { addMovie, addMovieAdminCinema, deleteMovie, editMovie, fetchAllAdminCinema, fetchAllMovie, fetchAllMovieAdminCinema } from "../../service/userService";



const AdminCinemaManageMovie = () => {
    const [isShowModalAdd, setIsShowModalAdd] = useState(0)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [totalPages, setTotalPage] = useState(0);
    const [listMovie, setListMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const accountsPerPage = 10// Số tài khoản trên mỗi trang
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedMovie, setSelectedMovie] = useState("");
    const [adminId, setAdminId] = useState("");


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
        try {
            // Tạo một FormData từ dữ liệu chỉnh sửa
            const formData = new FormData();
            formData.append('id', dataEdit._id);
            formData.append('name', dataEdit.name);
            formData.append('director', dataEdit.director);
            formData.append('performer', dataEdit.performer);
            formData.append('category', dataEdit.category);
            formData.append('premiere', dataEdit.premiere);
            formData.append('time', dataEdit.time);
            formData.append('language', dataEdit.language);
            formData.append('trailerUrl', dataEdit.trailerUrl);
            formData.append('status', dataEdit.status);
            // if (dataEdit.image) {
            //     formData.append('image', dataEdit.image);
            // }
            if (dataEdit.poster && dataEdit.poster instanceof File) {
                formData.append('poster', dataEdit.poster);
            }
            // Gọi hàm editAccount với FormData đã tạo
            const response = await editMovie(formData);
            if (response) {
                await getAllMovie();
                setIsShowModalEdit(!isShowModalEdit);
                toast.success("Edit success!");
            }
        } catch (error) {
            toast.error("Edit error");
        }
    }
    const handleDeleteFromModal = async (dataEdit) => {
        try {
            const response = await deleteMovie(dataEdit._id);
            if (response) {
                await getAllMovie()
                setIsShowModalDelete(!isShowModalDelete)
                toast.success("Delete successful!!!")
            }
        } catch (error) {
            toast.error("Delete error")
        }
    }
    const getAllMovie = async () => {
        try {
            // const response = await fetchAllmovie();
            const response = await fetchAllMovieAdminCinema(currentPage, accountsPerPage);
            if (response) {
                setTotalPage(response.totalPages);
                setListMovie(response.data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddMovie = async () => {
        try {
            // Call addMovieAdminCinema API with adminId and selectedMovie
            const response = await addMovieAdminCinema(adminId, selectedMovie);
            console.log(response.data); // Log response data
            // Handle success or error here
        } catch (error) {
            console.error("Error adding movie to cinema:", error);
        }
    };

    useEffect(() => {
        getAllMovie();
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
        const sorted = [...listMovie];
        // Sắp xếp mảng sorted dựa trên trạng thái sắp xếp hiện tại
        sorted.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);; // Sắp xếp tăng dần
            } else {
                return b.name.localeCompare(a.name); // Sắp xếp giảm dần
            }
        });
        // Cập nhật items state với mảng đã sắp xếp
        setListMovie(sorted);
        // Đảo ngược trạng thái sắp xếp để sử dụng cho lần nhấp tiếp theo
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    // useEffect(() => {
    //     const fetchSearchResults = async () => {
    //         try {
    //             const searchData = await searchMovie(searchMovie);
    //             setListMovie(searchData);
    //         } catch (error) {
    //             console.error('Error searching:', error);
    //         }
    //     };
    //     if (searchMovie !== '') {
    //         fetchSearchResults();
    //     } else {
    //         setIsSearching(false);
    //         getAllMovie();
    //     }
    // }, [searchMovie]);
    return (
        <>
            <div className="account-container">
                <div className="account-list">
                    <div className="button-account">
                        <h2>Movie in cinema</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsShowModalAdd(true)}
                        >Add new</button>
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
                                    <th>Poster</th>
                                    <th>Director</th>
                                    <th>Performer</th>
                                    <th>Category</th>
                                    <th>Premiere</th>
                                    <th>Time</th>
                                    <th>Language</th>
                                    <th>status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listMovie && listMovie.length > 0 &&
                                    listMovie.map((item, index) => {
                                        return (
                                            <tr key={`movies-${index}`}>
                                                {item && item.movie.name && <td>{item.movie.name}</td>}
                                                <td><img src={item.movie.poster} style={{ width: "90px", height: "90px", display: "block", margin: "auto" }} /></td>
                                                <td>{item.movie.director}</td>
                                                <td>{item.movie.performer}</td>
                                                <td>{item.movie.category?.name}</td>
                                                <td>{formatDate(new Date(item.movie.premiere))}</td>
                                                <td>{item.movie.time} Minutes</td>
                                                <td>{item.movie.language}</td>
                                                <td>{item.movie.status}</td>
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
            <AdminCinemaAddMovie
                show={isShowModalAdd}
                handleClose={handleClose}
                handleAddNewMovie={handleAddMovie}
            />
            <AdminCinemaEditMovie
                show={isShowModalEdit}
                dataEditMovie={dataEdit}
                handleClose={handleClose}
                handleMovieEdit={handleEditFromModal}
            />
            <AdminCinemaDeleteMovie
                show={isShowModalDelete}
                handleClose={handleClose}
                dataMovieDelete={dataDelete}
                handleMovieDelete={handleDeleteFromModal}
            />
        </>
    )
}

export default AdminCinemaManageMovie