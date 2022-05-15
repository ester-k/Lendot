export default function({ route, redirect }) {
    // debugger
    if (route.path != "/login") {
        if (route.path == "/createRequest") {
            let createRequestData = JSON.parse(localStorage.getItem("createRequestData"));
            let createRequestStep = createRequestData.createRequestStep;
            if (createRequestStep) {
                let redirectPath = "/createRequest/" + createRequestStep
                return redirect(redirectPath)
            } else {
                return redirect("/createRequest/aboutLoan")
            }
        }
        if (route.path.indexOf("createRequest") != -1 || route.path == "/createPassword" || route.path == "/resetPassword") {
            return route
        }
        if (!$nuxt.$fire.auth.currentUser)
            return redirect('/login');
        else if (route.path == "/") {
            return redirect('/loanerScreen')

        }
    } else {
        if (route.path == "/login") {
            if ($nuxt.$fire.auth.currentUser)
                return redirect('/loanerScreen');
        }

    }
}