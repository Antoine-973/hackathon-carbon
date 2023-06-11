import {ServicesBases} from "./servicesBases.ts";

export const PassServices = {

    getPasses: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/pass');
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getPass: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/pass/'+id);
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    savePass: async (pass: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pass)
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

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