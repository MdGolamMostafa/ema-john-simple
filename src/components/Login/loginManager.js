
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FireBaseConfig';

export const initializeLoginFramework = () => {
   if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
   }
}

export  const handleGoogleSignIn = ()=> {
    const  provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    
    .then(result => {
      const {email,displayName,photoURL} = result.user;
      const signedInUser ={
        isSignedIn: true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
    
      return signedInUser ;
    //  console.log(email,displayName,photoURL);
    })
    .catch(error=> {
      console.log(error);
      console.log(error.message);
    })

    
  }

  export const handleFacebookLogin = ()=> {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
     return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage,email, credential);

    });
  }


   export const handleSignOut = () => {
   return firebase.auth().signOut()
    .then(result => {
    const signOutUser ={
      isSignedIn:false,
      newUser : false,
      name:'',
      email:'',
      photo:'',
      error:'',
      success : false
    }
    return signOutUser;
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
    
  }

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
      // console.log(result);
      const newUserInfo = result.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
    //   setUser (newUserInfo);
    updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
        return newUserInfo;
      //   setUser(newUserInfo);
    //   updateUserName(user.name);
    });
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      const newUserInfo = result.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
      
    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function(){
      console.log('User name updated successfully')
    }).catch(function(err){
      console.log(err);
    })
  }