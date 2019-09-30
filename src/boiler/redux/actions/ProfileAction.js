import { PROFILE_UPDATE } from './types'

export const profileUpdate = (payload) => {

    return {
        type: PROFILE_UPDATE,
        payload
    }
};

