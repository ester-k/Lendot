// export const state = () => ({
//     state() {
//         return {
//             currentUser: {},
//             createAccountStep: 1,
//             userRequests: new Array(),
//         }
//     },

// })

export const state = () => ({
    currentUser: {},
    createAccountStep: 1,
    userRequests: new Array(),

})
export const actions = {
    set(state, { variable, value }) {
        debugger
        state[variable] = value
    }
}