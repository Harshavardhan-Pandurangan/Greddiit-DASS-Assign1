import Auth from "./Auth/auth";
import SignIn from "./Auth/signin";
import SignUp from "./Auth/signup";
import Profile from "./Profile/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
