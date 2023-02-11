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
    palette: {
        mode: "dark",
    },
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    const username = "kinghahaha";
    const firstname = "Harshavardhan";
    const lastname = "Pandurangan";
    const email = "rockingharsha71@gmail.com";
    const contact = "+91-909-4717-606";
    const dob = "02/14/2003";
    const age = "19";

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
                    <Button
                        variant="contained"
                        style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "2rem",
                            color: "white",
                            backgroundColor: "rgb(243, 114, 32)",
                        }}
                    >
                        <HomeIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            localStorage.setItem("sign_status", "false");
                            navigate("/", { replace: true });
                        }}
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
                        <Grid item xs={11}>
                            <Typography
                                component="h1"
                                variant="h5"
                                style={{
                                    color: "rgb(150, 150, 150)",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                User Profile
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Fab
                                size="small"
                                style={{
                                    color: "white",
                                    backgroundColor: "rgb(243, 114, 32)",
                                }}
                                aria-label="edit"
                            >
                                <EditIcon />
                            </Fab>
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
                                    color: "rgb(255, 255, 255)",
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
                                    color: "rgb(255, 255, 255)",
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
                                    color: "rgb(180, 180, 180)",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                style={{ color: "rgb(180, 180, 180)" }}
                            >
                                {dob}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h3"
                                variant="h6"
                                style={{ color: "rgb(180, 180, 180)" }}
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
