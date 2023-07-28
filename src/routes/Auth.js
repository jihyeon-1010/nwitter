import React from 'react'
import { authService, firebaseInstance } from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Auth ()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target : { className },
        } = event;
        let provider;
        if (className === "google") {
            provider = new GoogleAuthProvider();
        } else if (className === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    const onChange = (event) => {
        const {
            target: { className, value },
        } = event;
        if (className === "email") {
            setEmail(value);
        } else if (className === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data; 
            if (newAccount) {
            // 회원가입
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // 로그인
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        } 
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input className="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
                <div>
                    <button onClick={onSocialClick} className='google'>google</button>
                    <button onClick={onSocialClick} className='github'>github</button>
                </div>
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </div>
    )
}

export default Auth;
