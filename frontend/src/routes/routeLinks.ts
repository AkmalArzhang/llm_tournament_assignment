import type { routeComponents } from "./pages";

interface RouteInterface {
    title: string;
    uri: string;
    component: keyof typeof routeComponents;
    private: boolean;
}

export const routeLinks: RouteInterface[] = [
    {
        title: 'Home',
        uri: '/',
        component: 'Home',
        private: true,
    },
    {
        title: 'Tournament',
        uri: '/tournament/:question_id',
        component: 'Tournament',
        private: true,
    },
    {
        title: 'Login',
        uri: '/login',
        component: 'Login',
        private: false,
    },
    {
        title: 'Register',
        uri: '/register',
        component: 'Register',
        private: false,
    },
    {
        title: '404 Not Found',
        uri: '*',
        component: 'NotFound',
        private: false,
    },
];