import {UserState} from "./user-reducer"
import { RootState } from "../store";
export const selectCurrentUser = (state:RootState): UserState['currentUser'] => {
    console.log('full state:', state);
    console.log('user state:', state.user);
    console.log('currentUser:', state.user.currentUser);
    return state.user.currentUser;
}