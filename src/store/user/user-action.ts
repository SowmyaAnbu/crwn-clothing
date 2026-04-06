  import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
  import { USER_ACTION_TYPES } from "./user-types";
  import { User } from "firebase/auth";
 
  export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, User>
  export const setCurrentUser = withMatcher((user:User): SetCurrentUser => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
     