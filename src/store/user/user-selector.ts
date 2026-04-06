import {UserState} from "./user-reducer"
import { RootState } from "../store";
export const selectCurrentUser = (state:RootState): UserState['currentUser'] => state.user.currentUser;