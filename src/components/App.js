import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import 'firebase/compat/auth';
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);  // 로그인한 사람의 정보를 관리하기 위한 상태변수

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => updateProfile(user, {displayName: user.displayName }),
        });  // 로그인한 사람의 정보
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  }; 

  return (
    <>
      {init ? (
        <AppRouter 
          refreshUser={refreshUser} 
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj} /> 
        ) : (
          "initializing..."
        
        )}
    </>
  )
}
export default App;
