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
        debugger
        if (!authUser) {
            this.$router.push('/login')
        } else {
            state.commit("setState", {
                value: JSON.parse(
                    localStorage.getItem("currentUser")
                ),
                state: "currentUser"
            })

            if (!state.state.currentUser) {
                localStorage.removeItem("emailVerified");
            }
            this.$router.push('/loanerScreen')
        }
    }
}