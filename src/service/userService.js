
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

const loginWithGoogle = () => {
    return axios.get("/auth/google");
}

const registerApi = (data) => {
    return axios.post("/register", data);
};

const forgotPasswordApi = (data) => {
    return axios.post("/forgot-password", data)
}

const resetPassword = (token, newPassword) => {
    return axios.post("/reset-password", { token, newPassword })
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
const fetchAllAdminCinema = () => {
    return axios.get("/all-admin-cinema", getAuthHeaders());
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

const fetchShowTimeByMovie = (movieId) => {
    return axios.get(`/showtime-by-movie/${movieId}`, getAuthHeaders())
}

const fetchAllCinema = (currentPage, accountsPerPage) => {
    return axios.get("/all-cinema", {
        params: { page: currentPage, limit: accountsPerPage },
        ...getAuthHeaders()
    });
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

const fetchAllMovieAdminCinema = (currentPage, accountsPerPage) => {
    return axios.get("/all-movie-admin-cinema", {
        params: { page: currentPage, limit: accountsPerPage },
        ...getAuthHeaders()
    });
}
const addMovieAdminCinema = (movieId) => {
    return axios.post("/add-movie-to-cinema", { movieId: movieId }, getAuthHeaders());
};

const updateMovieAdminCinema = (movieId) => {
    return axios.put("/update-movie-from-cinema", movieId, getAuthHeaders());
}
const deleteMovieAdminCinema = (_id) => {
    return axios.delete(`/delete-movie-from-cinema/${_id}`, getAuthHeaders());
}

const fetchAllSeatPrice = () => {
    return axios.get("/all-seat-price", getAuthHeaders())
}

const fetchAllFood = () => {
    return axios.get("/all-food", getAuthHeaders())
}

const paymentPaypal = (data) => {
    return axios.post("/create-payment", data, getAuthHeaders())
}

const saveBooking = (data) => {
    return axios.post("/save-booking", data, getAuthHeaders())
}

const historyPurchase = (userId) => {
    return axios.get(`/history-purchase/${userId}`, getAuthHeaders())
}

const fetchAllSeatStatus = (showtimeId, selectedTime, selectedDate) => {
    return axios.get(`/seats/status?showtimeId=${showtimeId}&selectedTime=${encodeURIComponent(selectedTime)}&selectedDate=${encodeURIComponent(selectedDate)}`, getAuthHeaders())

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
    fetchDataCinemaByProvince,
    loginWithGoogle,
    resetPassword,
    fetchAllAdminCinema,
    fetchAllMovieAdminCinema,
    addMovieAdminCinema,
    fetchShowTimeByMovie,
    fetchAllSeatPrice,
    fetchAllFood,
    paymentPaypal,
    saveBooking,
    historyPurchase,
    fetchAllSeatStatus,
    updateMovieAdminCinema,
    deleteMovieAdminCinema
}