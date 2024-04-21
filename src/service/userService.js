
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

const resetPassword = () => {

}

// const fetchAllUser = () => {
//     return axios.get("/all-users");
// };

const fetchAllUser = (currentPage, accountsPerPage) => {
    return axios.get("/all-users", {
        params: { page: currentPage, limit: accountsPerPage },
        ...getAuthHeaders()
    });
};

const addNewAccount = (userData) => {
    return axios.post("/create-users", userData, getAuthHeaders());
};

const editAccount = (userData) => {
    return axios.put("/update-users", userData, getAuthHeaders());
};

const deleteAccount = (_id) => {
    return axios.delete(`/delete-users/${_id}`, getAuthHeaders());
};

const fetchDetailUser = () => {
    return axios.get(`/profile`, getAuthHeaders());
}

const editProfile = (userData) => {
    return axios.put("/update-profile", userData, getAuthHeaders());
}

const changePassword = (currentPassword, newPassword) => {
    const data = {
        currentPassword: currentPassword,
        newPassword: newPassword
    };
    return axios.post("/change-password", data, getAuthHeaders());
}

const search = (name) => {
    return axios.get(`/users/search?name=${name}`, getAuthHeaders())
}

const fetchAllMovie = (currentPage, accountsPerPage) => {
    return axios.get("/all-movie", {
        params: { page: currentPage, limit: accountsPerPage },
        ...getAuthHeaders()
    });
}
const editMovie = (userData) => {
    return axios.put("/update-movie", userData, getAuthHeaders());
}
const addMovie = (userData) => {
    return axios.post("/create-movie", userData, getAuthHeaders());
}
const deleteMovie = (_id) => {
    return axios.delete(`/delete-movie/${_id}`, getAuthHeaders());
}
const searchMovies = (name) => {
    return axios.get(`/search-movie?name=${name}`, getAuthHeaders())
}
const fetchAllCategory = () => {
    return axios.get("/all-category", getAuthHeaders())
}
const fetchAllShowTime = (currentPage, accountsPerPage) => {
    return axios.get("/all-show-time", {
        params: { page: currentPage, limit: accountsPerPage },
        ...getAuthHeaders()
    });
};

const addShowTime = (data) => {
    return axios.post("/create-show-time", data, getAuthHeaders())
}

const editShowTime = (data) => {
    return axios.put("/update-show-time", data, getAuthHeaders())
}

const deleteShowTime = (_id) => {
    return axios.delete(`/delete-show-time/${_id}`, getAuthHeaders())
}

const fetchAllShowTimeDaily = () => {
    return axios.get(`/showtime/all-dates`, getAuthHeaders())
}

const fetchAllCinema = (currentPage, accountsPerPage) => {
    return axios.get("/all-cinema", getAuthHeaders())
}

const addCinema = (data) => {
    return axios.post("/create-cinema", data, getAuthHeaders())
}

const editCinema = (data) => {
    return axios.put("/update-cinema", data, getAuthHeaders())
}

const deleteCinema = (_id) => {
    return axios.delete(`/delete-cinema/${_id}`, getAuthHeaders())
}

const getProvinceCinema = () => {
    return axios.get("/province-cinema", getAuthHeaders())
}

const fetchDataCinemaByProvince = (province) => {
    return axios.get(`/cinema-by-province?province=${province}`, getAuthHeaders())
}

const fetchAllRoom = () => {
    return axios.get("/all-room", getAuthHeaders())
}

const getMovieNowShowing = () => {
    return axios.get("/movie-now-showing", getAuthHeaders())
}

const getMovieUpComing = () => {
    return axios.get("/movie-upcoming", getAuthHeaders())
}

const getAllProvince = () => {
    return axios.get("https://province-api-dccinema.onrender.com/provinces", getAuthHeaders())
}

const getAllDistrict = (province) => {
    return axios.get(`https://province-api-dccinema.onrender.com/districts/${province}`, getAuthHeaders())
}

const getAllCommune = (district) => {
    return axios.get(`https://province-api-dccinema.onrender.com/wards/${district}`, getAuthHeaders())
}

export {
    fetchAllUser,
    addNewAccount,
    editAccount,
    deleteAccount,
    loginApi,
    forgotPasswordApi,
    registerApi,
    search,
    fetchAllMovie,
    editMovie,
    addMovie,
    deleteMovie,
    fetchAllCategory,
    searchMovies,
    fetchAllShowTime,
    addShowTime,
    editShowTime,
    deleteShowTime,
    fetchAllCinema,
    fetchAllRoom,
    fetchAllShowTimeDaily,
    addCinema,
    editCinema,
    deleteCinema,
    getAllProvince,
    getAllDistrict,
    getAllCommune,
    getMovieNowShowing,
    getMovieUpComing,
    fetchDetailUser,
    editProfile,
    changePassword,
    getProvinceCinema,
    fetchDataCinemaByProvince
}