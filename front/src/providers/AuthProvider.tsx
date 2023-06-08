import {createContext, ReactNode, useContext, useState} from "react";

interface AuthContextInterface {
    user: User;
    setUser: (user: User) => void;
}
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface) ;
export default function AuthProvider ({children }: {children: ReactNode})  {

    if (!localStorage.getItem('token') && window.location.pathname !== "/login") {
        window.location.href = "/login"
    }

    const [user, setUser] = useState<User>
    ({
        role:"admin",
    } as User) ;

    if(!user) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext) ;