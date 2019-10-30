//routerConfig.js
const routes = [
    {
        path: '/',
        component: 'Scrollex',
        loginBtn: true,
        signBtn: true,
    },
    {
        path: '/story',
        component: 'Scrollex',
        loginBtn: true,
        signBtn: true,
    },
    {
        path: '/service',
        component: 'Scrollex',
        loginBtn: true,
        signBtn: true,     
    },
    {
        path: '/industry',
        component: 'Scrollex',
        loginBtn: true,
        signBtn: true,
    },
    {
        path: '/why',
        component: 'Scrollex',
        loginBtn: true,
        signBtn: true,
    },
    {
        path: '/form',
        component: 'Scrollex',
        loginBtn: true,
        signBtn: true,     
    },
    {
        path: '/login',
        component: 'Login',
        loginBtn: true,
        signBtn: true,    
    },
    {
        path: '/register',
        component: 'Register',
        loginBtn: false,
        signBtn: false,      
    },
    {
        path: '/agreement',
        component: 'Agreement',
        loginBtn: false,
        signBtn: false,        
    },
    {
        path: '/welcome',
        component: 'Welcome',
        signBtn: true, 
    },
]

export default routes
