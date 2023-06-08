import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import SecuredPage from "./SecuredPage.tsx";
import {SCOPES} from "./permissions.ts";
import ProfileListPage from "../pages/ProfileListPage.tsx";
import AppLayout from "../layouts/AppLayout";
import NotFoundPage from "../pages/error/NotFoundPage.tsx";
import ForumPage from "../pages/forum/ForumPage.tsx";

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
            path:'/forum',
            name:'Forum',
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ForumPage/>
                </SecuredPage>
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