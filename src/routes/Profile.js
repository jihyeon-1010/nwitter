import React from 'react'
import { authService, dbService } from 'fbase';
import { useNavigate  } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

// 로그인한 user 정보를 prop으로 받기
function Profile ({ userObj, refreshUser }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
      authService.signOut();
      navigate("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  }

  return (
    <div className='container'>
        <form onSubmit={onSubmit} className='profileForm'>
        <input
          onChange={onChange}
          type='text'
          placeholder='Display name'
          value={newDisplayName}
          autoFocus
          className='formInput'
        />
        <input
          type='submit'
          value={'Update Profile'}
          className='formBtn'
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className='formBtn cancleBtn logOut' onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;


