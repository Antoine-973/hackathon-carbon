import {ServicesBases} from "./servicesBases.tsx";

export const PassServices = {
    getLastPass: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/pass');
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}