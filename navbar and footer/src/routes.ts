// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Modul  from "./pages/Modul";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'modul-route',
        title: 'Modul',
        path: '/modul',
        enabled: true,
        component: Modul
    }
]