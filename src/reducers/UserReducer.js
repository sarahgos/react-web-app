// type contains the type of operation to use and payload contains data.
const UserReducer = (state, action) => {

    const {type, payload} = action;
    const {currentUser} = state;

    switch(type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }
        case 'REMOVE_CURRENT_USER':
            return {
                ...state,
                currentUser: null
            }

        default:
            throw new Error("Unhandled type $(type)")
    }
}

export default UserReducer;