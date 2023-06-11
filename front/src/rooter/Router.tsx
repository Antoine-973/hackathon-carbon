import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import SecuredPage from "./SecuredPage.tsx";
import {SCOPES} from "./permissions.ts";
import ProfilePage from "../pages/profile/ProfilePage.tsx";
import AppLayout from "../layouts/AppLayout";
import {EvenementPage} from "../pages/events/EvenementPage.tsx";
import NotFoundPage from "../pages/error/NotFoundPage.tsx";
import ForumQuizz from "../pages/forum/ForumQuizz.tsx";
import ForumPage from "../pages/forum/ForumPage.tsx";
import {Login} from "../pages/Login";
import {FormationPage} from "../pages/formation/FormationPage.tsx";
import {Dashboard} from "../pages/admin/dashboard";
import AdminLayout from "../layouts/AdminLayout.tsx";
import FormationItemPage from "../pages/formation/FormationItemPage.tsx";
import EvenementItemPage from "../pages/events/EvenementItemPage.tsx";
import ProfileListPage from "../pages/profile/ProfileListPage.tsx";

interface Route {
    path: string;
    name: string;
    element: Element | ReactNode ;
}

export const useAdminRoute = () => {
    const routes : Route[] = [

        {
            path:'/admin/dashboard',
            name:'Dashboard',
            element:
                <SecuredPage scopes={[SCOPES.SUPPORT, SCOPES.ADMIN]}>
                    <Dashboard/>
            </SecuredPage>
        },
    ]
    return routes.map((route: Route) => {
        return <Route key={route.name} {...route}/>
    });
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
          path:'/formation/:id',
            name:'Formation',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <FormationItemPage/>
                </SecuredPage>
        },
        {
            path: "/evenement",
            name: "Evenements",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <EvenementPage/>
                </SecuredPage>
        },
        {
            path:'/evenement/:id',
            name:'Evenement',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <EvenementItemPage/>
                </SecuredPage>
        },
        {
            path:'/consultant',
            name:'Consultant',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ProfileListPage/>
                </SecuredPage>
        },
        {
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
            path:'*',
            name:'Not Found',
            element: <NotFoundPage/>
        }
    ] ;

    
    // comm test

    return routes.map((route: Route) => {
       return <Route key={route.name} {...route}/>
    });
}

export default function Router() {
   const routes = useRoutes();
   const adminRoutes = useAdminRoute();
   return (
       <Suspense>
           <Routes>
               <Route path={'/'} element={<AppLayout/>}>
                   {
                       routes.map(route => route)
                   }
               </Route>
               <Route path={''} element={<AdminLayout/>}>
                   {
                       adminRoutes.map(route => route)
                   }
               </Route>
                <Route path={'/login'} element={<Login/>}/>
           </Routes>
       </Suspense>
   )
}