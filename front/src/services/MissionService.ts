import {ServicesBases} from "./servicesBases.ts";

export const MissionService = {
    getAll: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/mission', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            return error ;
        }
    },
    create: async (data: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/mission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            return error ;
        }
    },
    delete: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/mission/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            return error ;
        }
    }
}