import Auth from "./Auth/auth";
import SignIn from "./Auth/signin";
import SignUp from "./Auth/signup";
import Profile from "./Profile/profile";
import Edit from "./Profile/edit-profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Auth />} />
                    <Route path="auth/">
                        <Route index element={<Auth />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="edit-profile" element={<Edit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
