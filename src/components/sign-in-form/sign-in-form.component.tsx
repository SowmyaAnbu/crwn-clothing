import FormInput from "../form-input/form-input.component";
import { useState, SubmitEvent, ChangeEvent } from "react";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, signInWithAuthEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user-action";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles"


  const defaultFormFields = {
    email : '',
    password : '',
  }

const SignInForm = () => {
     const dispatch = useDispatch();
     const [formFields, setFormFields] = useState(defaultFormFields);
     const {email, password} = formFields;

   
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
} 

 const signInWithGoogle = async () => {
     dispatch(googleSignInStart()); 
 } 

const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
        dispatch(emailSignInStart(email, password));
        setFormFields(defaultFormFields);
    } catch(error) {
        if((error as AuthError).code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            alert("invalid username/password ")
        } else {
            console.log("error while signing in ", error);
        }
    }
}

 return (
       <SignInContainer>
        <h2>I already have an account</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>
            <FormInput label="Password" type = "password" required onChange={handleChange} name = "password" value = {password}/>
            <ButtonsContainer>
            <Button type = 'submit'>Sign In</Button>
             <Button type= 'button' buttonType = {BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                Google Sign In
             </Button>
             </ButtonsContainer>
        </form>
       
       </SignInContainer>
    )
}

export default SignInForm;