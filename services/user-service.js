const axios = require('axios');
let apiTarget = "";
if (process.env.NODE_ENV == "production") {
    apiTarget = "https://lendot-staging-akav9.ondigitalocean.app"
}
if (process.env.NODE_ENV == "development") {
    apiTarget = "http://localhost:5000"
}
const createUser = async(newUser) => {
    const response = await axios.post(`${apiTarget}/user/createUser`, newUser);
    return response.data;
}
const deleteUser = async() => {
    const response = await axios.get(`${apiTarget}/user/deleteUser`);
    return response.data;
}
const getUserByEmail = async(email) => {
    const response = await axios.get(`${apiTarget}/user/getUserByEmail/${email}`);
    return response.data;
}
const getUsers = async() => {
    const response = await axios.get(`${apiTarget}/user/getUsers`);
    return response.data;
}

const updateUser = async(id, user) => {
    const response = await axios.post(`${apiTarget}/user/updateUser`, { id: id, user: user });
    return response.data;
}

const updateUserStatus = async(email, isActive) => {
    const response = await axios.post(`${apiTarget}/user/updateUserStatus`, { email: email, isActive: isActive });
    return response.data;
}
module.exports = {
    createUser,
    deleteUser,
    getUserByEmail,
    getUsers,
    updateUser,
    updateUserStatus
}



// export default ($axios) => {
//     // inject('getProductList', async (params) => await $axios.get('cool_get_url', {
//     //   params
//     // }))
//     createUser: async(data) => {
//         return await $axios.post('http://localhost:5000/user/createUser', newUser);
//     }
// }