import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../../style/manageAccounts.css"
import AddMovie from "./addMovie";
import EditMovie from "./editMovie";
import DeleteMovie from "./deleteMovie";
import { addMovie, deleteMovie, editMovie, fetchAllMovie, searchMovies } from "../../service/userService"
import { toast } from 'react-toastify';
import { RiArrowUpDownLine } from "react-icons/ri";
import Form from 'react-bootstrap/Form';
import { formatDate } from '../../service/formatDate';

const ManageMovie = () => {

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
    const [searchMovie, setSearchMovie] = useState('');
    const [isSearching, setIsSearching] = useState(false);

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
            const response = await fetchAllMovie(currentPage, accountsPerPage);
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
    const handleAddMovie = async (movieData) => {
        try {
            let check = false
            // console.log(userData.image);
            Object.keys(movieData).map(key => {
                if (movieData[key] == '') {
                    check = true
                }
            })
            if (!check) {
                const formData = new FormData()
                Object.keys(movieData).map(key => {
                    formData.append(key, movieData[key])
                })
                const res = await addMovie(formData);
                if (res.status) {
                    console.log(">>>>", res.status);
                    toast.warn(res.data.message)
                    await getAllMovie()
                    setIsShowModalAdd(!isShowModalAdd)
                } else {
                    toast.success("Add sucessful!!!")
                    await getAllMovie()
                    setIsShowModalAdd(!isShowModalAdd)
                }

            } else {
                toast.error('Please enter all field!')
            }
        } catch (error) {

        }
    }

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
        if (isSearching) {
            return null
        } else {
            return pages;
        }

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

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const searchData = await searchMovies(searchMovie);
                setListMovie(searchData);
            } catch (error) {
                console.error('Error searching:', error);
            }
        };

        if (searchMovie !== '') {
            fetchSearchResults();
        } else {
            setIsSearching(false)
            getAllMovie();
        }
    }, [searchMovie]);

    const handleSearch = (e) => {
        // e.preventDefault();
        const { value } = e.target;
        setSearchMovie(value);
        setIsSearching(true)
    }

    return (
        <>
            <div className="account-container">
                <div className="account-list">
                    <div className="button-account">
                        <h3>All Movie</h3>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                        </Form>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsShowModalAdd(true)}
                        >Add new</button>
                    </div>
                    <div className="table-account">
                        <Table striped bordered hover>
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
                                    {/* <th>trailerUrl</th> */}
                                    <th>status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listMovie && listMovie.length > 0 &&
                                    listMovie.map((item, index) => {
                                        console.log("???>>>>>>", item);
                                        return (
                                            <tr key={`movies-${index}`}>
                                                {item && item.name && <td>{item.name}</td>}
                                                <td><img src={item.poster} style={{ width: "90px", height: "90px", display: "block", margin: "auto" }} /></td>
                                                <td>{item.director}</td>
                                                <td>{item.performer}</td>
                                                <td>{item.category?.name}</td>
                                                <td>{formatDate(new Date(item.premiere))}</td>
                                                <td>{item.time}</td>
                                                <td>{item.language}</td>
                                                {/* <td>{item.trailerUrl}</td> */}
                                                <td>{item.status}</td>
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
            <AddMovie
                show={isShowModalAdd}
                handleClose={handleClose}
                handleAddNewMovie={handleAddMovie}
            />
            <EditMovie
                show={isShowModalEdit}
                dataEditMovie={dataEdit}
                handleClose={handleClose}
                handleMovieEdit={handleEditFromModal}
            />
            <DeleteMovie
                show={isShowModalDelete}
                handleClose={handleClose}
                dataMovieDelete={dataDelete}
                handleMovieDelete={handleDeleteFromModal}
            />
        </>
    )
}

export default ManageMovie