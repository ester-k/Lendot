const axios = require('axios');
let apiTarget = "";
if (process.env.NODE_ENV == "production") {
    apiTarget = "https://lendot-staging-akav9.ondigitalocean.app"
}
if (process.env.NODE_ENV == "development") {
    apiTarget = "http://localhost:5000"
}
const createOffer = async(newOffer) => {
    const response = await axios.post(`${apiTarget}/offer/createOffer`, newOffer);
    return response.data;
}
const getAllOffers = async() => {
    const response = await axios.get(`${apiTarget}/offer/getAllOffers`);
    return response.data;
}
const getOfferById = async(offerId) => {
    const response = await axios.get(`${apiTarget}/offer/getOfferById/${offerId}`);
    return response.data;
}
const getOffersByLender = async(lenderId) => {
    const response = await axios.get(`${apiTarget}/offer/getOffersByLender/${lenderId}`);
    return response.data;
}
const getOffersByRequest = async(requestId) => {
    const response = await axios.get(`${apiTarget}/offer/getOffersByRequest/${requestId}`);
    return response.data;
}
const getOffersByStatus = async(statusId) => {
    const response = await axios.get(`${apiTarget}/offer/getOffersByStatus/${statusId}`);
    return response.data;
}
const getOffersByStatusByLoan = async(loanId, status) => {
    let body = { "loanId": loanId, "status": status }
    const response = await axios.get(`${apiTarget}/offer/getOffersByStatusByLoan/${JSON.stringify(body)}`);
    return response.data;
}

const updateOfferStatus = async(offerId, status) => {
    let body = { "offerId": offerId, "status": status }
    console.log(body.status);
    const response = await axios.post(`${apiTarget}/offer/updateOfferStatus`, body);
    return response.data;
}

module.exports = {
    createOffer,
    getAllOffers,
    getOfferById,
    getOffersByLender,
    getOffersByRequest,
    getOffersByStatus,
    getOffersByStatusByLoan,
    updateOfferStatus,

};