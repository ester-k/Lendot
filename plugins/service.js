import userService from '~/services/user-service.js'
import requestService from '~/services/request-service.js'
import offerService from '~/services/offer-service.js'

export default ({ $axios, inject }) => {
    // inject('createUser', async(newUser) => await $axios.post('http://localhost:5000/user/createUser', newUser))

    // const allMethods = {
    //     ...userService($axios),
    //     ...requestService($axios),
    //     ...offerService($axios),
    // }
    // const methods = Object.keys(allMethods)
    // methods.forEach((method) => {
    //     debugger
    //     inject(method, allMethods[method])
    // })
}