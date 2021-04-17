import React, { useContext, useRef, useState } from 'react';
import { Card, Container, Form, Image } from 'react-bootstrap';
import google from '../../images/logos/Group 573.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from 'react-hook-form';
import './Login.css';
import amajonLogo from '../../images/ama2.png';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

// export const initializeLoginFramework = () => {
    
// }
if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    
    const { register, handleSubmit,formState: { errors },watch, reset } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const [newUser, setNewUser] = useState(false);    
    
    const [user, setUser ] = useState({
        IsSignIn : false,        
        FirstName: '',
        LastName : '',
        email : '',
        password : '',
        photo : '',
        errorMsg: '',
        success: false
    })
    console.log(user);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(loggedInUser);

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = (data,e) => {
        const userInfo = {
            FirstName: data.FirstName,
            LastName : data.LastName,
            email : data.email,
            password : data.password,
        };
        setUser(userInfo);        
        
        if(newUser && data.email && data.password){
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    
                    const newUser = {...user};                        
                    newUser.errorMsg = '';
                    newUser.success = true;
                    setUser(newUser);
                    updateUserInfo(data.FirstName)
                    // Signed in 
                    const EmailUser = userCredential.user;
                    // console.log(EmailUser);
                    // ...
                })
                .catch((error) => {
                    const handleError = {...user};
                    handleError.errorMsg = error.message;
                    handleError.success = false;
                    setUser(handleError);
                    
                    // ..
                });
            } 
            //if the user isn't a new user then 
            if(!newUser && data.email && data.password){
                firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then((userCredential) => {
                        //context api set value
                        const UserLogin = {...data};
                        setLoggedInUser(UserLogin);

                        //user state value set
                        const newUser = {...user};
                        newUser.email = data.email;
                        newUser.password = data.password;
                        newUser.errorMsg = '';
                        newUser.success = true;
                        setUser(newUser); 
                        console.log(newUser);                       
                        history.replace(from);
                        // Signed in 
                        const EmailUser = userCredential.user;
                        console.log('user name ',EmailUser);
                    })
                    .catch((error) => {
                        const handleError = {...user};
                        handleError.errorMsg = error.message;
                        handleError.success = false;
                        setUser(handleError);
                    });

            }
        reset();
        // e.preventDefault();
    }

    const updateUserInfo = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        })
        .then(function() {
            console.log('user Name update successfully');
        }).catch(function(error) {        
            console.log(error) ;
        });
    }
    
    const handleGoogleSingIn = () => {
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then(res => {
            const {displayName, photoURL, email} = res.user ;
            const userSignIn = {
                IsSignIn : true,
                FirstName : displayName,
                photo: photoURL,
                email : email
            }
            setUser(userSignIn);
        })
    }
    const handleGoogleSingOut = () => {
        firebase.auth().signOut()
        .then(() => {
            const userSignOut = {
                IsSignIn : false,
                FirstName : '',
                email : '',
                photo : '' 
            }
            setUser(userSignOut);
          }).catch((error) => {
             console.log(error);
          });
    }

    
    return (
        <div>
            <Container>
                <center>
                    <div className="login-container"> 
                    <h2>{user.email}</h2>
                    <h2>{user.password}</h2>               
                        <Card className="Input-form">
                        { newUser &&
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Image className="amajon-Logo" src={amajonLogo} fluid/>
                                <h4 className="input-h-text">Create An Account</h4>
                                <Form.Control type="text" className="input-field" placeholder="First name" {...register("FirstName", {required: true, maxLength: 80})} />
                                {errors.FirstName && "First name is required"}
                                <Form.Control type="text" className="input-field" placeholder="Last name" {...register("LastName", {required: true, maxLength: 100})} />
                                {errors.LastName && "Last name is required"}                            
                                <Form.Control type="email" className="input-field" placeholder="email" {...register("email", {required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} />
                                {errors.email && "Email is required"}
                                <Form.Control type="password" className="input-field" name="password" placeholder="password" {...register("password", 
                                {required: "You must specify a password",                            
                                    minLength: {
                                    value: 6,
                                    message: "Password must have at least 6 characters"
                                    }    
                                })} />
                                {errors.password && <p>{errors.password.message}</p>}
                                <Form.Control type="password" className="input-field" placeholder="Confirm Password" {...register("confirmPassword",
                                {
                                    validate: value =>
                                    value === password.current || "The passwords do not match"
                                })} />
                                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>} 

                                <input className='submit-btn' type="submit" />
                                <br/>
                                <div>
                                    <h6>Already Have an Account? <span onClick={() => setNewUser(false)} className="text-info">Login</span></h6>
                                </div> 
                            </form>    
                        }
                            
                        {!newUser && 
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Image className="amajon-Logo" src={amajonLogo} fluid/>
                                <h4 className="input-h-text">Log In</h4>
                                <Form.Control type="email" className="input-field" placeholder="email" {...register("email", {required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} />
                                    {errors.email && "Email is required"}
                                <Form.Control type="password" className="input-field" name="password" placeholder="password" {...register("password", 
                                    {required: true,                            
                                        minLength: {
                                        value: 6                                    
                                        }    
                                    })} />
                                    {errors.password && "password is required"} 
                                <input className='submit-btn' type="submit" /> 
                                <div>
                                    <h6>Don't have an Account? <span onClick={() => setNewUser(!newUser)} className="text-info">Create an Account</span></h6>
                                </div>   
                            </form>
                        }
                        </Card>
                        <div className="text-center">
                            <p className="text-danger">{user.errorMsg}</p>
                            {
                                user.success && <p className="text-success">User {newUser ? 'Created' : 'log in'} successfully</p>
                            }
                        </div>     
                        <div className="login-system d-flex justify-content-center">
                            {
                                user.IsSignIn ? 
                                <div onClick={handleGoogleSingOut} className="d-flex google">
                                    <Image className="google-img" src={google} fluid/>
                                    <h5>Google LogOut</h5>
                                </div>
                                :
                                <div onClick={handleGoogleSingIn} className="d-flex google">
                                    <Image className="google-img" src={google} fluid/>
                                    <h5>Google Login</h5>
                                </div>
                            }
                            
                        </div>                               
                    </div>
                </center>    
            </Container>                    
        </div>
    );
};

export default Login;