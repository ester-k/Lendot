export default function({ route, redirect }) {
    if (route.path != "/login") {
        if (route.path == "/createRequest") {
            let createRequestData = JSON.parse(localStorage.getItem("createRequestData"));
            let createRequestStep = null;
            if (createRequestData)
                createRequestData = createRequestData.createRequestStep
            if (createRequestStep) {
                let redirectPath = "/createRequest/" + createRequestStep
                return redirect(redirectPath)
            } else {
                return redirect("/createRequest/aboutLoan")
            }
        }
        if (route.path.indexOf("createRequest") != -1 || route.path == "/createPassword" || route.path == "/recetPassword") {
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