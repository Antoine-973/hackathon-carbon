import {ServicesBases} from "./servicesBases.tsx";

export const UserServices = {
    getUsers: async () => {
        try {
            const response = await fetch(`${ServicesBases.apiUrl}/user`, {
                method: 'GET',
            });
            return await response.json();
        } catch (e) {
            console.log(e)
        }
    }
}