import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

import UsersTable from "./UsersTable";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    width: "50%",
    margin: "1em",
    color: "white",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [userFormOpen, setUserFormOpen] = useState(false);

  const openUserForm = () => {
    setUserFormOpen(true);
  };
  const closeUserForm = () => {
    setUserFormOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Admin Panel: Users management
            </Typography>
            <Button
              className={classes.title}
              onClick={() => openUserForm()}
              className={classes.button}
            >
              Add a user
            </Button>
          </Toolbar>
        </AppBar>
        <UsersTable userFormOpen={userFormOpen} closeUserForm={closeUserForm} />
      </Dialog>
    </div>
  );
}
