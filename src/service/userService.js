
import axios from './customize-axios'

const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const loginApi = (email, password) => {
    return axios.post("/login", { email, password });
};

const registerApi = (data) => {
    return axios.post("/register", data);
};

const forgotPasswordApi = (data) => {
    return axios.post("/forgot-password", data)
}

const resetPassword = () =>{

}

const fetchAllUser = () => {
    return axios.get("/all-users");
};

// const fetchAllUser = (currentPage, accountsPerPage) => {
//     return axios.get("/all-users", {
//         params: { page: currentPage, limit: accountsPerPage },
//         ...getAuthHeaders()
//     });
// };

const addNewAccount = (userData) => {
    return axios.post("/create-users", userData, getAuthHeaders());
};

const editAccount = (userData) => {
    return axios.put("/update-users", userData, getAuthHeaders());
};

const deleteAccount = (_id) => {
    return axios.delete(`/delete-users/${_id}`, getAuthHeaders());
};

const searchUser = (_id) => {
    return axios.get(`/users/search`, getAuthHeaders());
};

export {
    fetchAllUser,
    addNewAccount,
    editAccount,
    deleteAccount,
    loginApi,
    forgotPasswordApi,
    registerApi,
    searchUser
}