

export const loginReducer = (state , action) => {
    switch (action.type) {
        case 'LOGIN':
        return {
            ...state,
            isLoggedIn: true,
            user: action.user
        }
        case 'LOGOUT':
        return {
            ...state,
            isLoggedIn: false,
            user: null
            }
        case "addImage":
            return {
                ...state,
                imageUser: action.imageUser
            }
        case "addEmail":
            return {
                ...state,
                email: action.email
            }
        default:
        return state
    }
    }