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
    counter: 0

})
export const mutations = {
    setAccountStep(state, payload) {
        state[payload.state] = payload.value
    },
    setState(state, payload) {
        state[payload.state] = payload.value
    },

}
export const actions = {
    onAuthStateChangedAction(state, { authUser, claims }) {
        console.log("authUser", authUser);
        console.log("claims", claims);
        if (!authUser) {
            this.$router.push('/login')
            console.log("not conect");

        } else {
            // debugger
            this.$router.push('/loanerScreen')
            console.log("conect");
        }
    }
}