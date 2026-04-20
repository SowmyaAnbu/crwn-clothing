import { useState, SubmitEvent, ChangeEvent} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { signUpStart } from "../../store/user/user-action";
import { useDispatch } from "react-redux";

const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    } 

    const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
         if (password !== confirmPassword) {
           alert("Passwords don't match!");
          return;
         }
         try {
            dispatch(signUpStart(email, password, displayName));
            setFormFields(defaultFormFields);
        } catch (error) {
            console.log(error);
         if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
              alert('This email is already registered. Please sign in instead.');
              return;
            } else {
                console.log('user creation encountered an error');
            }
        }       
    }
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit= {handleSubmit}>
                <FormInput label="Display Name"  type = "text" required onChange={handleChange} name = "displayName" value = {displayName} />

                <FormInput label="Email" type = "email" required onChange={handleChange} name = "email" value = {email}/>

                <FormInput label="Password" type = "password" required onChange={handleChange} name = "password" value = {password}/>
              
                <FormInput label="ConfirmPassword" type = "password" required onChange={handleChange} name = "confirmPassword" value = {confirmPassword}/>

                <Button type = "submit">Sign Up</Button>

            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;