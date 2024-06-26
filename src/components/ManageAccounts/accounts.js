import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../../style/manageAccounts.css"
import AddAccount from "./addAccount";
import EditAccount from "./editAccount";
import DeleteAccount from "./deleteAccount";
import { fetchAllUser, addNewAccount, deleteAccount, editAccount, search, fetchAllAdminCinema } from "../../service/userService"
import { toast } from 'react-toastify';
import { RiArrowUpDownLine } from "react-icons/ri";
import Form from 'react-bootstrap/Form';
import { formatDate } from '../../service/formatDate';

const Account = () => {

    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [totalPages, setTotalPage] = useState(0);
    const [listAccount, setListAccount] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const accountsPerPage = 10// Số tài khoản trên mỗi trang
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchUser, setSearchUser] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showPaginationBelow, setShowPaginationBelow] = useState(false);
    const [listAdminCinema, setListAdminCinema] = useState([])
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: "",
        phone: "",
        role: "",
        cinema: "",
        dateOfBirth: "",
        gender: "",
        image: null
    })

    const resetUserData = () => {
        setUserData({
            name: "",
            password: "",
            email: "",
            phone: "",
            role: "",
            cinema: "",
            dateOfBirth: "",
            image: null
        })
    }

    const handleClose = () => {
        setIsShowModalAdd(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
        resetUserData()
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
            formData.append('phone', dataEdit.phone);
            formData.append('email', dataEdit.email);
            formData.append('password', dataEdit.password);
            formData.append('dateOfBirth', dataEdit.dateOfBirth);
            formData.append('gender', dataEdit.gender);
            formData.append('role', dataEdit.role);
            formData.append('cinema', dataEdit.cinema);

            // if (dataEdit.image) {
            //     formData.append('image', dataEdit.image);
            // }
            if (dataEdit.image && dataEdit.image instanceof File) {
                formData.append('image', dataEdit.image);
            }
            // Gọi hàm editAccount với FormData đã tạo
            const response = await editAccount(formData);
            if (response) {
                await getAllUser();
                setIsShowModalEdit(!isShowModalEdit);
                toast.success("Edit account success!!!");
            }
        } catch (error) {
            toast.error("Edit account error!!!");
        }
    }
    const handleDeleteFromModal = async (dataEdit) => {
        try {
            const response = await deleteAccount(dataEdit._id);
            if (response) {
                await getAllUser()
                setIsShowModalDelete(!isShowModalDelete)
                toast.success("Delete account successful!!!")
            }
        } catch (error) {
            toast.error("Delete account error")
        }
    }
    const getAllUser = async () => {
        try {
            // const response = await fetchAllUser();
            const response = await fetchAllUser(currentPage, accountsPerPage);
            if (response) {
                setTotalPage(response.totalPages);
                setListAccount(response.data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleAddAccount = async (userData) => {
        try {
            let check = false
            console.log(">>>check".userData);
            Object.keys(userData).map(key => {
                if (userData[key] == '') {
                    check = false
                }
                if (key == 'image' && !userData[key]) {
                    check = true
                }
            })
            if (!check) {
                const formData = new FormData()
                Object.keys(userData).map(key => {
                    formData.append(key, userData[key])
                })
                const res = await addNewAccount(formData);
                if (res.status) {
                    console.log(">>>>", res.status);
                    toast.warn(res.data.message)
                    await getAllUser()
                } else {
                    toast.success("Add account sucessful!!!")
                    await getAllUser()
                    resetUserData()
                    setIsShowModalAdd(!isShowModalAdd)
                }
            } else {
                toast.error('Please enter all field!')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    // useEffect(() => {
    //     getAllUser();
    // }, []);
    useEffect(() => {
        getAllUser();
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
        const sorted = [...listAccount];
        // Sắp xếp mảng sorted dựa trên trạng thái sắp xếp hiện tại
        sorted.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);; // Sắp xếp tăng dần
            } else {
                return b.name.localeCompare(a.name); // Sắp xếp giảm dần
            }
        });
        // Cập nhật items state với mảng đã sắp xếp
        setListAccount(sorted);
        // Đảo ngược trạng thái sắp xếp để sử dụng cho lần nhấp tiếp theo
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const searchData = await search(searchUser);
                setListAccount(searchData);
            } catch (error) {
                console.error('Error searching:', error);
            }
        };
        if (searchUser !== '') {
            fetchSearchResults();
        } else {
            setIsSearching(false)
            getAllUser();
        }
    }, [searchUser]);

    const handleSearch = (e) => {
        // e.preventDefault();
        const { value } = e.target;
        setSearchUser(value);
        setIsSearching(true)
    }

    const getAllAdminCinema = async () => {
        try {
            const response = await fetchAllAdminCinema();
            console.log(response)
            if (response) {
                setListAdminCinema(response.data); // Cập nhật state listAdminCinema
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }
    useEffect(() => {
        getAllAdminCinema();
    }, []);
    return (
        <>
            <div className="account-container">
                <div className="account-list">
                    <div className="button-account">
                        <h2>All Account</h2>
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
                    <div className="table-account" style={{ backgroundColor: "white", borderRadius: "10px", marginTop: "10px", boxShadow: "0 0 0px #b8bec4", padding: "5px" }}>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th className="sort-table">Name
                                        <div className="sort">
                                            <RiArrowUpDownLine onClick={handleSort} />
                                        </div>
                                    </th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date of birth</th>
                                    <th>Gender</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listAccount && listAccount.length > 0 &&
                                    listAccount.map((item, index) => {
                                        console.log(item);
                                        return (
                                            <tr key={`users-${index}`}>
                                                <td><img src={item.image} style={{ width: "90px", height: "90px", display: "block", margin: "auto" }} /></td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{formatDate(new Date(item.dateOfBirth))}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.role}</td>
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
            <AddAccount
                show={isShowModalAdd}
                handleClose={handleClose}
                handleAddNewAccount={handleAddAccount}
                userData={userData}
                setUserData={setUserData}
            />
            <EditAccount
                show={isShowModalEdit}
                dataEditAccount={dataEdit}
                handleClose={handleClose}
                handleAccountEdit={handleEditFromModal}
            />
            <DeleteAccount
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataDelete}
                handleAccountDelete={handleDeleteFromModal}
            />
        </>
    )
}

export default Account