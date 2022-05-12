const axios = require('axios');
let apiTarget = "";
if (process.env.NODE_ENV == "production") {
    apiTarget = "https://lendot-staging-akav9.ondigitalocean.app"
}
if (process.env.NODE_ENV == "development") {
    apiTarget = "http://localhost:5000"
}

const removeFileDB = async(params) => {
    const response = await axios.post(`${apiTarget}/documents/remove`, params);
    return response.data;
}
const getStatusById = async(statusId) => {
    const response = await axios.get(`${apiTarget}/documents/getStatus/${statusId}`, );
    return response.data;
}
const countMissingDocs = async(offer) => {
    let status = "6269565e8b7b1e5b2c6851ad";
    let avalibaleStatus = "626a2909e444b82e0c459e21";
    let returnOffer;
    await getStatusById(avalibaleStatus).then(response => {
        let missingDocs = 0;
        if (offer.status._id == status) {
            offer.documents.forEach((doc) => {
                if (!doc.loanerDocs || !doc.loanerDocs.length)
                    if (!doc.loanerDocs.length) missingDocs++;
            });
            offer["missingDocs"] = missingDocs;
        }
        if (!missingDocs) offer.status = response;
        returnOffer = offer;
    });
    return returnOffer
}
module.exports = {
    removeFileDB,
    getStatusById,
    countMissingDocs
}