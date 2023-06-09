import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import SecuredPage from "./SecuredPage.tsx";
import {SCOPES} from "./permissions.ts";
import ProfilePage from "../pages/ProfilePage.tsx";
import ProfileListPage from "../pages/ProfileListPage.tsx";
import AppLayout from "../layouts/AppLayout";
import EvenementPage from "../pages/EvenementPage.tsx";
import NotFoundPage from "../pages/error/NotFoundPage.tsx";
import ForumQuizz from "../pages/forum/ForumQuizz.tsx";
import ForumPage from "../pages/forum/ForumPage.tsx";
import {Login} from "../pages/Login";
import FormationIndex from "../pages/formation/FormationIndex.tsx";
import {FormationPage} from "../pages/formation/FormationPage.tsx";

interface Route {
    path: string;
    name: string;
    element: Element | ReactNode ;
}

export const useRoutes = () => {
    const routes: Route[] = [
        {
            path: "/",
            name: "Home",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <HomePage/>
                </SecuredPage>
        },
        {
            path: "/consultant",
            name: "Consultant",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ProfileListPage/>
                </SecuredPage>
        },
        {
            path: "/evenement",
            name: "Evenement",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <EvenementPage/>
                </SecuredPage>
        },
        {
            path: "/profile/:id",
            name: "Profile",
            path: "/consultant/:id",
            name: "User profile",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ProfilePage/>
                </SecuredPage>
        },
        {
            path: "/profil",
            name: "Current user profile",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ProfilePage/>
                </SecuredPage>
        },
        {
            path:'/forum',
            name:'Forum',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ForumPage/>
                </SecuredPage>
        },
        {

            path: '/forum/:id',
            name: 'Topic',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ForumQuizz/>
                </SecuredPage>
        },
        {
            path:'/formation',
            name:'Formation',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <FormationPage/>
                </SecuredPage>
        },
        {
            path:'/login',
            name:'Login',
            element: <Login/>
        },
        {
            path:'*',
            name:'Not Found',
            element: <NotFoundPage/>
        }
    ] ;

    return routes.map((route: Route) => {
       return <Route key={route.name} {...route}/>
    });
}

export default function Router() {
   const routes = useRoutes();
   return (
       <Suspense>
           <Routes>
               <Route path={'/'} element={<AppLayout/>}>
                   {
                       routes.map(route => route)
                   }
               </Route>
           </Routes>
       </Suspense>
   )
}