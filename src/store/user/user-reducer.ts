import { USER_ACTION_TYPES } from "./user-types";
import { setCurrentUser } from "./user-action";
import {UnknownAction} from "redux";
import { User } from "firebase/auth";

export type UserState = {
    currentUser: User | null
  
}

const INITIAL_STATE: UserState = {
    currentUser: null
}

export const userReducer =  (state = INITIAL_STATE, action: UnknownAction): UserState => {
 
    if(setCurrentUser.match(action)){
          return {
                ...state,
                currentUser: action.payload
            }
    }
    return state;
}