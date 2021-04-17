import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}  


//google sign In
export const handleGoogleSingIn = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(GoogleProvider)
    .then(res => {
        const {displayName, photoURL, email} = res.user ;
        const userSignIn = {
            IsSignIn : true,
            FirstName : displayName,
            photo: photoURL,
            email : email
        }
        return userSignIn;                
    })
}

//google sign out
export const handleGoogleSingOut = () => {
    return firebase.auth().signOut()
    .then(() => {
        const userSignOut = {
            IsSignIn : false,
            FirstName : '',
            email : '',
            photo : '' 
        }
        return userSignOut;
      }).catch((error) => {
         console.log(error);
      });
}

//create user with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {                    
        const newUser = userCredential.user;                        
        newUser.errorMsg = '';
        newUser.success = true;
        updateUserInfo(name)
        return newUser;
        
        // Signed in 
        // const EmailUser = userCredential.user;
        // console.log(EmailUser);
        // ...
    })
    .catch((error) => {
        const handleError = {};
        handleError.errorMsg = error.message;
        handleError.success = false;
        return handleError;
        
        // ..
    });            
} 
//sign In With Email And Password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const newUser = userCredential.user;
        newUser.errorMsg = '';
        newUser.success = true;
        return (newUser);
    })
    .catch((error) => {
        const handleError = {};
        handleError.errorMsg = error.message;
        handleError.success = false;
        return(handleError);
    });                
}

//update user name
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