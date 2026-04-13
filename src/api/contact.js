import axios from 'axios'

export const getA1 = () => {
    return axios.get('/api/contact/a1')
}

export const postA2 = (payload) => {
    return axios.post('/api/contact/a2', payload)
}

export const getA3ById = (id) => {
    return axios.get(`/api/contact/a3/${id}`)
}