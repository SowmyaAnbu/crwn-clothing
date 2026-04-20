  import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
  import { USER_ACTION_TYPES } from "./user-types";
  import { User } from "firebase/auth";
  import { AdditionalInformation } from "../../utils/firebase/firebase.utils";
 
  export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, User>
  export const setCurrentUser = withMatcher((user:User): SetCurrentUser => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
  
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export const checkUserSession = withMatcher((): CheckUserSession =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export const googleSignInStart = withMatcher((): GoogleSignInStart =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

type EmailAndPassword = {
  email: string;
  password: string;
}

export type EmailPasswordAndDisplayName = EmailAndPassword & {
  displayName: string;
};

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, EmailAndPassword>
 export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

  export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, User>
  export const signInSuccess = withMatcher((user:User): SignInSuccess => 
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS,user));

  export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>
  export const signInFailed = withMatcher((error:Error): SignInFailed => 
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED,error));

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, EmailPasswordAndDisplayName>
 export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName })
);

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInformation }
>;

export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>
export const signUpFailed = withMatcher((error:Error): SignUpFailed => 
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED,error));

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>
export const signOutStart = withMatcher((): SignOutStart =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>
export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>
export const signOutFailed = withMatcher((error:Error): SignOutFailed => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED,error));

