import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub, } from "@fortawesome/free-brands-svg-icons";
import React from 'react'
import { authService, firebaseInstance } from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from 'components/AuthForm';

const Auth  = () =>  {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
    };

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button name='google' onClick={onSocialClick} className="authBtn">google <FontAwesomeIcon icon={faGoogle} /></button>
                <button name='github' onClick={onSocialClick} className="authBtn">github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
}

export default Auth;
