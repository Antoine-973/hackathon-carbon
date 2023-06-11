import {ServicesBases} from "./servicesBases.ts";

export const ClientServices = {

    getAllClients: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+ '/client');
            return await response.json();
        } catch (error) {
            return error;
        }
    }

}