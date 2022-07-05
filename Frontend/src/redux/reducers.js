import { CONSTANTS } from './actions'

const reducer = (state, action) => {

    switch(action.type) {
        case CONSTANTS.REGISTER.REGISTER_USER_BEGIN :
            return {
                ...state
            };
        
        case CONSTANTS.REGISTER.REGISTER_USER_SUCCESS :
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };

        case CONSTANTS.REGISTER.REGISTER_USER_ERROR :
            return {
                ...state,
            };
    }

    throw new Error(`no such action ${action.type}`);
}

export default reducer