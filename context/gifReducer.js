

export const gifReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GIF':
            return {
                ...state,
                gif: [...state.gif, action.gif]
            }
        case 'DELETE_GIF':
            return {
                ...state,
                gif: state.gif.filter(gif => gif.id !== action.id)
            }
        case "All_GIF":
            return {
                ...state,
                gif: action.gif
            }
        default:
            return state
    }
}