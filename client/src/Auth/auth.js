import { json, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    let navigate = useNavigate();

    if (!localStorage.token) {
        return <Navigate to="/auth/signin" replace={true} />;
    }

    axios
        .get("http://localhost:3001/users/verify", {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        })
        .then((res) => {
            console.log(res.data.verify);
            if (res.data.verify == "valid") {
                console.log("hmm");
                localStorage.id = res.data._id;
                console.log(localStorage.id);
                navigate("/home", { replace: true });
            } else {
                console.log("hmm2");
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                navigate("/auth/signin", { replace: true });
            }
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            navigate("/auth/signin", { replace: true });
        });
}
