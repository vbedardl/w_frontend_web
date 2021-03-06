import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import generator from "generate-password";
import MuiPhoneNumber from "material-ui-phone-number";

export default function FormDialog(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState("");
  const [phone, setPhone] = useState(null);

  const sendUserData = () => {
    const user = {
      name,
      email,
      phone,
      unit,
      password: generator.generate({ length: 8, numbers: true }),
    };
    props.submit(user);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a new User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="unit"
            label="Unit Number"
            type="text"
            fullWidth
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
          />
          <MuiPhoneNumber
            name="phone"
            label="Phone Number"
            data-cy="user-phone"
            defaultCountry={"us"}
            value={phone}
            onChange={(value) => setPhone(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={sendUserData} color="primary">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
