
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

const fetchAllMovieNotPagination = () => {
    return axios.get("/movies", getAuthHeaders());
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
const fetchAllCinemaNotPagination = () => {
    return axios.get("/cinemas", getAuthHeaders());
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

const fetchAllRoomInCinema = (cinemaId) => {
    return axios.get(`/all-room-cinema/${cinemaId}`, getAuthHeaders())
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

const updateMovieAdminCinema = (data) => {
    return axios.put("/update-movie-from-cinema", data, getAuthHeaders());
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

const addFood = (foodData) => {
    return axios.post("/add-food", foodData, getAuthHeaders())
}

const editFood = (foodData) => {
    return axios.put("/update-food", foodData, getAuthHeaders())
}

const deleteFood = (_id) => {
    return axios.delete(`/delete-food/${_id}`, getAuthHeaders())
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

const duplicateShowtime = (cinema, room, startDate, endDate) => {
    return axios.get(`/duplicates?cinema=${cinema}&room=${room}&startDate=${startDate}&endDate=${endDate}`, getAuthHeaders())
}

const fetchAllShowTimeAdminCinema = () => {
    return axios.get(`/admin-cinema/showtimes`, getAuthHeaders())
}

const addShowTimeAdminCinema = (data) => {
    return axios.post("/admin-cinema/create-showtime", data, getAuthHeaders())
}

const editShowTimeAdminCinema = (data) => {
    return axios.put("/admin-cinema/update-showtime", data, getAuthHeaders())
}

const deleteShowTimeAdminCinema = (_id) => {
    return axios.delete(`/admin-cinema/delete-showtime/${_id}`, getAuthHeaders())
}

const fetchAllShowTimeByCinema = () => {
    return axios.get(`/show-time-by-cinema`, getAuthHeaders())
}

const totalMovies = () => {
    return axios.get("/total-movies", getAuthHeaders())
}

const totalCinemas = () => {
    return axios.get("/total-cinema", getAuthHeaders())
}

const totalAccountCustomer = () => {
    return axios.get("/total-account-customer", getAuthHeaders())
}

const totalAccountStaff = () => {
    return axios.get("/total-account-staff", getAuthHeaders())
}

const totalMovieForAdminCinema = () => {
    return axios.get("/total-movie-cinema", getAuthHeaders())
}

const totalTicketSoldInCinema = () => {
    return axios.get("/total-ticket-sold-in-cinema", getAuthHeaders())
}

const totalRevenueInCinema = () => {
    return axios.get("/total-revenue-in-cinema", getAuthHeaders())
}

const totalAccountStaffInCinema = () => {
    return axios.get("/total-account-staff-in-cinema", getAuthHeaders())
}
const fetchColumnData = () => {
    return axios.get("/revenue-by-day", getAuthHeaders())
}

const fetchPercentData = () => {
    return axios.get("/seat-percentages", getAuthHeaders())
}

const fetchColumnDataAdminCinema = () => {
    return axios.get("/revenue-admin-cinema", getAuthHeaders())
}

const fetchPercentDataAdminCinema = () => {
    return axios.get("/seat-percentages-admin-cinema", getAuthHeaders())
}

const seatHold = (data) => {
    return axios.post("/hold-seats", data, getAuthHeaders())
}

const seatHoldStatus = (showtimeId, selectedTime, selectedDate) => {
    return axios.get(`/all-seats-hold?showtimeId=${showtimeId}&selectedTime=${encodeURIComponent(selectedTime)}&selectedDate=${encodeURIComponent(selectedDate)}`, getAuthHeaders())
}
const deleteSeatHold = (id) => {
    return axios.delete(`/delete-seats-hold/${id}`, getAuthHeaders())
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
    deleteMovieAdminCinema,
    fetchAllRoomInCinema,
    fetchAllMovieNotPagination,
    fetchAllCinemaNotPagination,
    duplicateShowtime,
    fetchAllShowTimeAdminCinema,
    addShowTimeAdminCinema,
    editShowTimeAdminCinema,
    addFood,
    editFood,
    deleteFood,
    deleteShowTimeAdminCinema,
    fetchAllShowTimeByCinema,
    totalMovies,
    totalCinemas,
    totalAccountCustomer,
    totalAccountStaff,
    totalMovieForAdminCinema,
    totalTicketSoldInCinema,
    totalRevenueInCinema,
    totalAccountStaffInCinema,
    fetchColumnData,
    fetchColumnDataAdminCinema,
    fetchPercentData,
    fetchPercentDataAdminCinema,
    seatHold,
    seatHoldStatus,
    deleteSeatHold
}