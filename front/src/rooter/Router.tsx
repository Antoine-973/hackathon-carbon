import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import SecuredPage from "./SecuredPage.tsx";
import { SCOPES} from "./permissions.ts";
import ProfileListPage from "../pages/ProfileListPage.tsx";

interface Route {
    path: string;
    name: string;
    element: ReactNode;
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
            path: "/consultants",
            name: "Consultants",
            element:
                <SecuredPage scopes={[SCOPES.CONSULTANT]}>
                    <ProfileListPage/>
                </SecuredPage>
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
               {
                   routes.map(route => route)
               }
           </Routes>
       </Suspense>
   )
}