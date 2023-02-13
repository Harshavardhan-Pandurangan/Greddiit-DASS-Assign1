import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit">Harshavardhan's Greddiit</Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme({
    typography: {
        fontSize: 12,
    },
});

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "2rem",
};

export default function Profile() {
    let navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [dob, setDob] = useState("");

    const editProfile = () => {
        navigate("/edit-profile", { replace: true });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/", { replace: true });
    };

    let request_path =
        "http://localhost:3001/users/get/" + localStorage.getItem("id");
    let json_pass_data = {
        headers: {
            Authorization: `token ${localStorage.token}`,
        },
    };

    useEffect(() => {
        axios
            .get(request_path, json_pass_data)
            .then((res) => {
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setEmail(res.data.email);
                setUsername(res.data.username);
                setContact(res.data.contactnumber);
                let formattedDate = new Date(res.data.dob).toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }
                );
                setDob(formattedDate);
            })
            .catch((err) => {});
    }, []);

    const [openFollowers, setOpenFollowers] = React.useState(false);
    const handleFollowersOpen = () => setOpenFollowers(true);
    const handleFollowersClose = () => setOpenFollowers(false);

    const [openFollowing, setOpenFollowing] = React.useState(false);
    const handleFollowingOpen = () => setOpenFollowing(true);
    const handleFollowingClose = () => setOpenFollowing(false);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Grid
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Tooltip title="Home">
                        <Button
                            variant="contained"
                            style={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                borderRadius: "2rem",
                                color: "white",
                                backgroundColor: "rgb(243, 114, 32)",
                            }}
                            onClick={() => navigate("/home", { replace: true })}
                        >
                            <HomeIcon />
                        </Button>
                    </Tooltip>
                    <Grid>
                        <Tooltip title="Edit Profile">
                            <Fab
                                size="small"
                                style={{
                                    color: "white",
                                    backgroundColor: "rgb(243, 114, 32)",
                                    margin: "0.5rem",
                                }}
                                aria-label="edit"
                                onClick={editProfile}
                            >
                                <EditIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Logout">
                            <Button
                                onClick={logout}
                                variant="contained"
                                style={{
                                    marginTop: "1rem",
                                    marginBottom: "1rem",
                                    borderRadius: "2rem",
                                    color: "white",
                                    backgroundColor: "rgb(243, 114, 32)",
                                }}
                            >
                                <LogoutIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        style={{ color: "rgb(243, 114, 32)" }}
                    >
                        Harshavardhan's Greddiit
                    </Typography>
                    <br />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                component="h1"
                                variant="h5"
                                style={{
                                    opacity: "0.5",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                User Profile
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Avatar
                        alt="Display Picture"
                        sx={{ width: 200, height: 200 }}
                    />
                    <br />
                    <Grid
                        container
                        spacing={2}
                        style={{ justifyContent: "center" }}
                    >
                        <Grid item xs={12} sm={12}>
                            <Typography
                                component="h2"
                                variant="h6"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {firstname + " " + lastname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                component="h2"
                                variant="h6"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {"u/" + username}
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid
                        container
                        spacing={2}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button onClick={handleFollowersOpen}>
                                Followers
                            </Button>
                            <Modal
                                open={openFollowers}
                                onClose={handleFollowersClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography variant="h6" component="h2">
                                        Followers
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}>
                                        <Typography>{"Person1"}</Typography>
                                        <Typography>{"Person2"}</Typography>
                                        <Typography>{"Person3"}</Typography>
                                        <Typography>{"Person4"}</Typography>
                                        <Typography>{"Person5"}</Typography>
                                    </Typography>
                                </Box>
                            </Modal>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button onClick={handleFollowingOpen}>
                                Following
                            </Button>
                            <Modal
                                open={openFollowing}
                                onClose={handleFollowingClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography variant="h6" component="h2">
                                        Following
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}>
                                        <Typography>{"Person1"}</Typography>
                                        <Typography>{"Person2"}</Typography>
                                        <Typography>{"Person3"}</Typography>
                                    </Typography>
                                </Box>
                            </Modal>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                component="h3"
                                variant="h6"
                                style={{
                                    opacity: 0.5,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                component="h3"
                                variant="h6"
                                style={{
                                    opacity: 0.5,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {dob}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                component="h3"
                                variant="h6"
                                style={{
                                    opacity: 0.5,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {contact}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
