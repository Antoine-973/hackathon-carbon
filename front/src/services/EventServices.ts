import { ServicesBases} from "./servicesBases.tsx";

export const EventServices = {
    getAllEvents: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl + "/events");
            return await response.json();
        } catch (error) {return error ;}

    }
}