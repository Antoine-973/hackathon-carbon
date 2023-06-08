import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import SecuredPage from "./SecuredPage.tsx";
import {SCOPES} from "./permissions.ts";
import ProfilePage from "../pages/ProfilePage.tsx";
import ProfileListPage from "../pages/ProfileListPage.tsx";
import AppLayout from "../layouts/AppLayout";
import NotFoundPage from "../pages/error/NotFoundPage.tsx";

import ForumQuizz from "../pages/forum/ForumQuizz.tsx";
import { FormationPage } from "../pages/FormationPage";
import ForumPage from "../pages/forum/ForumPage";


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
            path: "/profile/:id",
            name: "Profile",
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
            path:'/formations',
            name:'Formations',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <FormationPage/>
                </SecuredPage>
        },
        {
            path:'*',
            name:'Not Found',
            element: <NotFoundPage/>
        },
        {
            path: "/formations",
            name: "Formations",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <FormationPage/>
                </SecuredPage>
        },
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