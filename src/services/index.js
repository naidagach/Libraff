import { instance } from "./instance";

export async function getBestsellers() {
    try {
        const res = await instance.get('/getBestsellers')
        return res.data 
    } catch (error) {
        return error
    }
}

export async function getMostSearched() {
    try {
        const res = await instance.get('/mostSearchedBooks')
        return res.data
    } catch (error) {
        return error
    }
}

export async function getWeekMostViewed() {
    try {
        const res = await instance.get('/thisWeekMostViewedBooks')
        return res.data
    } catch (error) {
        return error
    }
}

export async function getCategory() {
    try {
        const res = await instance.get('/getCategories')
        return res.data
    } catch (error) {
        return error
    }
}

export async function get3Alma() {
    try {
        const res = await instance.get('/3AlmaMostRecents')
        return res.data
    } catch (error) {
        return error
    }
}
export async function getAuthors() {
    try {
        const res = await instance.get('/getAuthors')
        return res.data
    } catch (error) {
        return error
    }
}

export async function getBookById(id) {
    try {
        const res = await instance.get(`/getBookById?id=${id}`)
        return res.data
    } catch (error) {
        return error
    }
}

export async function getBooksByCategoryCode(code, pageNumber=1, pageCount=16) {
    try {
        const res = await instance.get(`/getBooksByCategoryCode?code=${code}&pageNumber=${pageNumber}&pageCount=${pageCount}`)
        return res.data
    } catch (error) {
        return error
    }
}