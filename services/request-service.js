const axios = require('axios');
let apiTarget = "";
if (process.env.NODE_ENV == "production") {
    apiTarget = "https://lendot-staging-akav9.ondigitalocean.app"
}
if (process.env.NODE_ENV == "development") {
    apiTarget = "http://localhost:5000"
}
const createRequest = async(newRequest) => {
    const response = await axios.post(`${apiTarget}/request/createRequest`, newRequest);
    return response.data;
}

const getRequestById = async(id) => {
    const response = await axios.get(`${apiTarget}/request/getRequestById/${id}`);
    return response.data;
}
const getRequestListByLoaner = async(loanerId) => {
    const response = await axios.get(`${apiTarget}/request/getRequestListByLoaner/${loanerId}`);
    return response.data;
}
const getOffersByLoanerRequest = async(loanerId) => {
    const response = await axios.get(`${apiTarget}/request/getOffersByLoanerRequest/${loanerId}`);
    return response.data;
}
const getRequestsWithAction = async(loanerId, ststuses) => {
    let params = { loanerId: loanerId, statuses: ststuses }
    const response = await axios.get(`${apiTarget}/request/getRequestsWithAction/${JSON.stringify(params)}`);
    return response.data;
}
const updateRequest = async(request) => {
    const response = await axios.post(`${apiTarget}/request/updateRequest`, request);
    return response.data;
}
module.exports = {
    createRequest,
    getRequestById,
    getRequestListByLoaner,
    getRequestsWithAction,
    getOffersByLoanerRequest,
    updateRequest
}