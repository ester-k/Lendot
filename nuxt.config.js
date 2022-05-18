import dotenv from 'dotenv'

let path =
    process.env.NODE_ENV === 'production' ?
    '.env' :
    '.env.' + process.env.NODE_ENV

dotenv.config({ path })
export default {


    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Lendot',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&&display=swap",
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/main.css', '~/assets/mainMobile.css'],
    script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js'
    }],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/service.js', '~/plugins/Vuelidate.js', '~/plugins/vue-pdf-embed.js', '~/plugins/popups.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios', '@nuxtjs/auth-next', ['@nuxtjs/recaptcha', {
            hideBadge: false,
            siteKey: '6Le3b5gfAAAAAGwcMbMTR52xBd3UCVw_ICS9t_ez',
            version: 3,
        }],
        ['@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyACIfcX8T_GFKZ0_9dSV7N2ZjcOyBo3F1w",
                    authDomain: "lendot-1ccc3.firebaseapp.com",
                    databaseURL: "https://lendot-1ccc3-default-rtdb.asia-southeast1.firebasedatabase.app",
                    projectId: "lendot-1ccc3",
                    storageBucket: "lendot-1ccc3.appspot.com",
                    messagingSenderId: "346751308376",
                    appId: "1:346751308376:web:96aca7f424011b606bb02d"
                },
                services: {
                    auth: {
                        persistence: 'local', // default
                        initialize: {
                            // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
                            onAuthStateChangedAction: 'onAuthStateChangedAction',
                            subscribeManually: false
                        },
                        ssr: false, // default
                        // emulatorPort: 9099,
                        emulatorHost: 'http://localhost',
                    }
                }
            }
        ]
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {

    },
    server: {
        port: 8080, // default: 3000
        host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost' // default: localhost
    },
    publicRuntimeConfig: {
        axios: {
            baseURL: "http://localhost:5000"
        }
    },
    router: {
        middleware: ['authRouer']
    },

    // auth: {
    //     strategies: {
    //         local: {
    //             endpoints: {

    //                 logout: { url: '/*logout api*/', method: 'post' },
    //                 user: false,
    //             }
    //         },
    //     },
    //     redirect: {
    //         login: '/login',
    //         logout: '/',
    //         home: '/loanerScreen',
    //         callback: '/login'
    //     },
    //     watchLoggedIn: true
    //         // Options
    // }

}