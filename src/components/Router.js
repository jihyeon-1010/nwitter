import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home"
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function AppRouter ({ isLoggedIn, userObj, refreshUser }) {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route exact path="/" element={<div style={{ 
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center", }}><Home userObj={userObj} /></div>} />
                    <Route exact path="/profile" element={<div style={{ 
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center", }}><Profile refreshUser={refreshUser} userObj={userObj} /></div>} />
                </>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;