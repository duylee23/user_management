import axios from "./axios"

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {
        name: name,
        job: job
    })
}

const putUpdateUser = (name, job) => {
    return axios.post("/api/users", {
        name: name,
        job: job
    })
}
const deleteUser = id => {
    return axios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
    return axios.post("/api/login", {
        email: email,
        password: password
    })
}


export {fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi}