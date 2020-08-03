import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../../config/firebase";

import "./AuthActions.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AuthActions = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // detect any user changes:
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in:
        console.log(authUser);
        setUser(authUser);
      } else {
        // user logged out:
        setUser(null);
      }
    });

    return () => {
      // perform clean up before useEffect is triggered so it doesnt spam log in attempts:
      unsubscribe();
    };
  }, [user, username]);

  const handleSignUp = (evt) => {
    evt.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));

    setOpen(false);
  };

  const handleSignIn = (evt) => {
    evt.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));

    setOpenSignIn(false);
  };

  return (
    <div>
      {/* TODO - Refactor modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="authActions__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
            </center>

            <Input
              placeholder={"username"}
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder={"email"}
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder={"password"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleSignUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="authActions__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
            </center>

            <Input
              placeholder={"email"}
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder={"password"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleSignIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      {user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ) : (
        <div className="authActions__loginActionsContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>

          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default AuthActions;
