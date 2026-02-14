import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, signInWithAuthEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

  const defaultFormFields = {
    email : '',
    password : '',
  }

const SignInForm = () => {
     const [formFields, setFormFields] = useState(defaultFormFields);
     const {email, password} = formFields;

   
const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
} 
const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const user = await signInWithAuthEmailAndPassword(email, password);
        console.log(user);
        setFormFields(defaultFormFields);
    } catch(error) {
        if(error.code === 'auth/invalid-credential') {
            alert("invalid username/password ")
        } else {
            console.log("error while signing in ", error);
        }
    }
  
}
 const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
  }
    return (
       <div className = 'sign-up-container'>
        <h2>I already have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>
            <FormInput label="Password" type = "password" required onChange={handleChange} name = "password" value = {password}/>
            <div className='buttons-container'>
            <Button type = 'submit'>Sign In</Button>
             <Button type= 'button' buttonType = 'google' onClick={signInWithGoogle}>
                Google Sign In
             </Button>
             </div>
        </form>
       
       </div>
    )
}

export default SignInForm;