import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn,
   handleSignOut, handleFacebookLogin, createUserWithEmailAndPassword, 
   signInWithEmailAndPassword } from './loginManager';


function Login() {

   

  const [newUser , setNewUser] = useState(false)
 

  const [user,setUser] = useState({
    isSignedIn:false,
    newUser: false,
    name: '',
    email: '',
    photo:''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        //   setUser(response);
        //   setLoggedInUser(response);
        //   history.replace(from);
        handleResponse(res,true);
        })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        //   setUser(response);
        //   setLoggedInUser(response);
        handleResponse(res,false);
        
      })
  }

  const handleResponse = (res,redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
  }

  const facebookLogin = () => {
      handleFacebookLogin()
      .then(res => {
        // setUser(response);
        // setLoggedInUser(response);
        // history.replace(from);
        handleResponse(res,true);
      })
  }
  
  const handleBlur = (event) => {
    let isFieldValid = true;
  //  console.log(event.target.name,event.target.value);
    if (event.target.name === 'email') {
       isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length>6;
      const passwordHasNumber =/\d{1}/.test (event.target.value)
      isFieldValid= isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value; //here name value is changeable
      setUser(newUserInfo); 
    }
  }

  const handleSubmit = (event) => {
    if (newUser.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email,user.password)
        .then(res => {
            // setUser(result);
            // setLoggedInUser(result);
            // history.replace(from);
            handleResponse(res,true);
        })
    }

    if (!newUser && user.email && user.password) {
     signInWithEmailAndPassword(user.email, user.password)
     .then(res => {
        // setUser(result);
        // setLoggedInUser(result);
        // history.replace(from);
        handleResponse(res,true);
     })
    }
    event.preventDefault();
  }

 
  return (
    <div style={{textAlign: 'center'}}>
    {
      user.isSignedIn ? <button onClick = { signOut }>Sign Out</button> :
      <button onClick = {googleSignIn}>SignIn</button>
      }
      <br/>
      <button onClick = {facebookLogin}>Sign in facebook</button> 
   {
      user.isSignedIn &&
      //  <h1>Display Name: {user.name}</h1> 
      <div>
        <h1>Display Name: {user.name}</h1>
        <h2>User Email: {user.email}</h2>
        <img src={user.photo} alt=""/>
     </div>
   } 
      <h1>Authentication Information</h1>
    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
    <level html="newUser">New User sign Up.</level>

    <form onSubmit={handleSubmit} action="">
       {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name"/>}
      <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
      <br/>
      <input type="submit" value="submit"/>
    </form>
        <p style={{color: 'red'}}>{user.error}</p>
      {user.success &&  <p style={{color: 'green'}}>User {newUser ? "created" : 'logged in'} Success</p>}
    </div>
  );
}

export default Login;
