import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import Home from './pages/Home';
import MissionControl from './pages/MissionControl';
import SignInPage from './pages/SignIn';
import useAuth from './hooks/useAuth';
import SignUpPage from './pages/SignUp';
import PageNotFound from './pages/NotFound';
import NavBar from './components/NavBar';

import PublicMissionsPage from './pages/PublicMissionsPage';
import MissionCreationPage from './pages/MissionCreation';
import APSearchPage from './pages/APSearch';
import MyWarriors from './pages/MyWarriors';
import MyWarriorsV2 from './pages/MyWarriorsV2';
import FeedbackForm from './pages/FeedbackForm';



function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
const RouterContent = () => (
    <Router>

        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<SignInPage></SignInPage>} />
            <Route path="/registration" element={<SignUpPage></SignUpPage>} />
            <Route path="/mission-control" element={<RequireAuth> <NavBar /><MissionControl /></RequireAuth>} />
            <Route path="/mission-creation" element={<RequireAuth> <NavBar /><MissionCreationPage /></RequireAuth>} />
            <Route path="/my-warriors" element={<RequireAuth> <NavBar /> <MyWarriorsV2 /></RequireAuth>} />
            <Route path="/public-challenges" element={<RequireAuth> <NavBar /> <PublicMissionsPage /></RequireAuth>} />
            <Route path="/ap-search" element={<RequireAuth> <NavBar /> <APSearchPage /></RequireAuth>} />
            <Route path="/help" element={<RequireAuth> <NavBar /> <FeedbackForm /></RequireAuth>} />
            <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
    </Router>
);

export default RouterContent;