import { Navigate } from "react-router-dom";

export default function Auth() {
    console.log(localStorage.sign_status);

    if (!localStorage.sign_status) {
        localStorage.sign_status = false;
    }

    if (localStorage.sign_status === "false") {
        return <Navigate to="/auth/signin" replace={true} />;
    } else {
        return <Navigate to="/profile" replace={true} />;
    }
}
