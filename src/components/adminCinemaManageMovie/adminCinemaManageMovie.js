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
import { addMovie, addMovieAdminCinema, deleteMovie, deleteMovieAdminCinema, editMovie, fetchAllAdminCinema, fetchAllMovie, fetchAllMovieAdminCinema, updateMovieAdminCinema } from "../../service/userService";



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
    const [setCinema, setListCinema] = useState("");


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
    const handleEditFromModal = async (data) => {
        console.log(">>>>>>>>>>Dataa", data)
        const id = data._id;
        let newData = { ...data };
        delete newData.__v;
        delete newData._id;
        // newData = { ...newData, id }
        const response = await updateMovieAdminCinema({ id, ...newData });
        console.log("response", response)
        try {
            // const response = await updateMovieAdminCinema(newData);
            if (response.data) {
                await getAllMovieCinema()
                setIsShowModalEdit(!isShowModalEdit)
                toast.success("Edit success!")
            }
        } catch (error) {
            toast.error("Edit error")
        }
    }
    const handleDeleteFromModal = async (data) => {
        try {
            const response = await deleteMovieAdminCinema(data._id);
            console.log("111111", response)
            if (response) {
                await getAllMovieCinema()
                setIsShowModalDelete(!isShowModalDelete)
                toast.success("Delete successful!!!")
            }
        } catch (error) {
            toast.error("Delete error")
        }
    }
    const getAllMovieCinema = async () => {
        try {
            // const response = await fetchAllmovie();
            const response = await fetchAllMovieAdminCinema(currentPage, accountsPerPage);
            if (response) {
                setTotalPage(response.totalPages);
                setListMovie(response.data);
                setListCinema({
                    // name: response.data[0].cinema.name,
                    id: response.data[0].cinema._id
                });
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddMovie = async (movieId) => {
        try {
            const response = await addMovieAdminCinema(movieId);
            console.log(">>> check", response);
            if (response.data) {
                await getAllMovieCinema()
                setIsShowModalAdd(!isShowModalAdd)
                toast.success("Create success!")
            } else {
                toast.warn("You need to enter all field!!!")
            }
        } catch (error) {
            console.error("Error adding movie to cinema:", error);
        }
    };

    useEffect(() => {
        getAllMovieCinema();
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
                CinemaInfor={setCinema}
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