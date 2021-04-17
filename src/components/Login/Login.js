import React, { useContext, useRef, useState } from 'react';
import { Card, Container, Form, Image } from 'react-bootstrap';
import google from '../../images/logos/Group 573.png';
import { useForm } from 'react-hook-form';
import './Login.css';
import amajonLogo from '../../images/ama2.png';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleGoogleSingIn, handleGoogleSingOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager/LoginManager';
import NavbarPart2 from '../Header/NavbarPart2';



const Login = () => {
    
    const { register, handleSubmit,formState: { errors },watch, reset } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const [newUser, setNewUser] = useState(false);
    initializeLoginFramework();    
    
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
    
    //use context api
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    
    //react route redirection
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/shipment" } };


    //create a new user and log in user
    const onSubmit = (data,e) => {
        const userInfo = {
            FirstName: data.FirstName,
            LastName : data.LastName,
            email : data.email,
            password : data.password,
        };
        setUser(userInfo);       
        
        if(newUser && data.email && data.password){
            createUserWithEmailAndPassword(data.FirstName, data.email, data.password)
            .then(res =>{
                handleResponse(res, true);
                // setUser(res);
                // setLoggedInUser(res);
                // history.replace(from);
            })   
        } 
        
        //if the user isn't a new user then 
        if(!newUser && data.email && data.password){
            signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                handleResponse(res, true);
                // setUser(res);
                // setLoggedInUser(res);
                // history.replace(from);
            }) 

        }
        reset();
        // e.preventDefault();
    }

    //Google Sign in
    const googleSingIn = () => {
        handleGoogleSingIn()
        .then(res => {
            handleResponse(res, true);
            // setUser(res);
            // setLoggedInUser(res);
            // history.replace(from);
        })
    }
    //Google Sign out
    const googleSignOut = () => {
        handleGoogleSingOut()
        .then(res => {
            handleResponse(res, false);
            // setUser(res);
            // setLoggedInUser(res);
        })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        
        if(redirect){
            history.replace(from);
        }        
    }
    
    return (
        <div>
            <NavbarPart2/>
            <Container>
                <center>
                    <div className="login-container">    
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
                                    <h6>Already Have an Account? <span style={{cursor: 'pointer'}} onClick={() => setNewUser(false)} className="text-info">Login</span></h6>
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
                                    <h6>Don't have an Account? <span style={{cursor: 'pointer'}} onClick={() => setNewUser(!newUser)} className="text-info">Create an Account</span></h6>
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
                                <div onClick={googleSignOut} className="d-flex google">
                                    <Image className="google-img" src={google} fluid/>
                                    <h5>Google LogOut</h5>
                                </div>
                                :
                                <div onClick={googleSingIn} className="d-flex google">
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