import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector";
import { Navigate } from "react-router-dom";
import { AuthenticationContainer } from './authentication.styles';
const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  if(currentUser) return <Navigate to='/shop' />;
    
    return (
         <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
          </AuthenticationContainer>
      
    )
} 

export default Authentication;