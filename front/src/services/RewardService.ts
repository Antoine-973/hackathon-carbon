import {ServicesBases} from './servicesBases';

export const RewardService = {

    getRewards: async () => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/reward');
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getReward: async (id: number) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/reward/'+id);
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    saveReward: async (pass: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/reward', {
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

    patchReward: async (id: number, stageId: any) => {
        try {
            const response = await fetch(ServicesBases.apiUrl+'/reward/'+id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({stageId: stageId})
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}