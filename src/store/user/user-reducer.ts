import { USER_ACTION_TYPES } from "./user-types";
import {  signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutFailed, signOutSuccess } from "./user-action";
import {UnknownAction} from "redux";
import { User } from "firebase/auth";

export type UserState = {
    currentUser: User | null;
    isLoading: boolean;
    error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer =  (state = INITIAL_STATE, action: UnknownAction): UserState => {
 
  
     if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false,
            error: null
        }
    }
      if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null,
            isLoading: false,
            error: null
        }
    }
    if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
        return {
            ...state,
            currentUser: null,
            isLoading: false,
            error: action.payload
        }
    }
   
      return state;
}