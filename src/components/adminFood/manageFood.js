import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { addFood, deleteFood, editFood, fetchAllFood } from "../../service/userService";
import AddFood from "./addFood";
import { toast } from "react-toastify";
import EditFood from "./editFood";
import DeleteFood from "./deleteFood";

const ManageFood = () => {
    
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        image: null
    })
    const [listFood, setListFood] = useState([])
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [sortOrder, setSortOrder] = useState('asc');

    const resetFoodData = () => {
        setFoodData({
            name: "",
            price: "",
            image: null
        })
    }
    const handleClose = () => {
        setIsShowModalAdd(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
        resetFoodData()
    }

    const handleEdit = (foodEdit) => {
        setDataEdit(foodEdit)
        setIsShowModalEdit(true)
    }

    const handleEditFromModal = async (dataEdit) => {
        try {
            const formData = new FormData();
            formData.append('id', dataEdit._id)
            formData.append('name', dataEdit.name)
            formData.append('price', dataEdit.price)
            if (dataEdit.image && dataEdit.image instanceof File) {
                formData.append('image', dataEdit.image)
            }
            const res = await editFood(formData)
            if (res) {
                await getAllFood()
                setIsShowModalEdit(!isShowModalEdit)
                toast.success("Edit food combo success!!!")
            }
        } catch (error) {
            toast.error("Edit food combo error!!!")
        }
    }

    const handleDelete = (foodDelete) => {
        setIsShowModalDelete(true)
        setDataDelete(foodDelete)
    }

    const handleDeleteFromModal = async (dataEdit) => {
        try {
            const response = await deleteFood(dataEdit._id);
            if (response) {
                await getAllFood()
                setIsShowModalDelete(!isShowModalDelete)
                toast.success("Delete food combo successful!!!")
            }
        } catch (error) {
            toast.error("Delete food combo error")
        }
    }

    const handleAddFood = async (foodData) => {
        try {
            let check = false
            // console.log(userData.image);
            Object.keys(foodData).map(key => {
                if (key == 'image' && !foodData[key]) {
                    check = true
                }
                if (foodData[key] == '') {
                    check = true
                }
            })
            if (!check) {
                const formData = new FormData()
                Object.keys(foodData).map(key => {
                    formData.append(key, foodData[key])
                })
                const res = await addFood(formData);
                if (res.status) {
                    console.log(">>>>", res.status);
                    toast.warn(res.data.message)
                    await getAllFood()
                    resetFoodData()
                    setIsShowModalAdd(!isShowModalAdd)
                } else {
                    toast.success("Add food combo sucessful!!!")
                    await getAllFood()
                    resetFoodData()
                    setIsShowModalAdd(!isShowModalAdd)
                }
            } else {
                toast.error('Please enter all field!')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getAllFood = async () => {
        try {
            const res = await fetchAllFood()
            if (res) {
                setListFood(res.data)
            }
        } catch (error) {
            console.error('Error fetching food combos');
        }
    }

    useEffect(() => {
        getAllFood()
    }, [])

    const handleSort = () => {
        // Sao chép mảng items để không làm thay đổi mảng gốc
        const sorted = [...listFood];
        // Sắp xếp mảng sorted dựa trên trạng thái sắp xếp hiện tại
        sorted.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price.localeCompare(b.price);; // Sắp xếp tăng dần
            } else {
                return b.price.localeCompare(a.price); // Sắp xếp giảm dần
            }
        });
        // Cập nhật items state với mảng đã sắp xếp
        setListFood(sorted);
        // Đảo ngược trạng thái sắp xếp để sử dụng cho lần nhấp tiếp theo
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    return (
        <>
            <div className="account-container">
                <div className="account-list">
                    <div className="button-account">
                        <h2>All Food Combo</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsShowModalAdd(true)}
                        >Add new</button>
                    </div>
                    <div className="table-account">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Combo's Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listFood && listFood.length > 0 &&
                                    listFood.map((item, index) => {
                                        return (
                                            <tr key={`users-${index}`}>
                                                <td><img src={item.image} style={{ width: "90px", height: "90px", display: "block", margin: "auto" }} /></td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
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
                </div>
            </div>
            <AddFood
                foodData={foodData}
                setFoodData={setFoodData}
                show={isShowModalAdd}
                handleClose={handleClose}
                handleAddNewFood={handleAddFood}
            />
            <EditFood
                show={isShowModalEdit}
                handleClose={handleClose}
                dataEditFood={dataEdit}
                handleEditFood={handleEditFromModal}
            />
            <DeleteFood
                show={isShowModalDelete}
                handleClose={handleClose}
                dataDeleteFood={dataDelete}
                handleDeleteFood={handleDeleteFromModal}
            />
        </>
    )
}

export default ManageFood