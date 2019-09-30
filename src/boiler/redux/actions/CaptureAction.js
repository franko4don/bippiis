import { CAPTURE_UPDATE } from './types'

export const captureUpdate = (payload) => {

    return {
        type: CAPTURE_UPDATE,
        payload
    }
};

