export default function({ route, redirect }) {
    console.log("here auth");
    if (route.path != "/login") {
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