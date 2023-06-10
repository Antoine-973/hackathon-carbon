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
    },
    createUsers: async (data: any) => {
        try {
            const response = await fetch(`${ServicesBases.apiUrl}/user`, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return await response.json();
        }catch (e) {
            console.log(e)
        }
    }
}