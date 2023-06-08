import {ServicesBases} from "./servicesBases";

const login = async (email:string, password:string):Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/authentication/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    return await response.json();
}

const profile = async ():Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/authentication/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    return await response.json();
}

const AuthService = {
    login,
    profile,
}

export default AuthService;