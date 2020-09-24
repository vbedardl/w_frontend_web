import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery, useMutation } from "@apollo/client";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmModal from "./confirmModal";
import UserFormModal from "./UserFormModal";
import Button from "@material-ui/core/Button";
import {
  GET_RESIDENTS,
  CREATE_USER,
  DELETE_USER,
  GET_PACKAGES,
} from "../../utils/Queries";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_RESIDENTS);
  const [createUserGQL] = useMutation(CREATE_USER);
  const [deleteUserGQL] = useMutation(DELETE_USER);
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeletionModalOpen, setConfirmDeletionModalOpen] = useState(
    false
  );

  useEffect(() => {
    if (data) {
      setUsersData(data.users);
    }
  }, [data]);

  const confirmDeletion = (userId) => {
    setConfirmDeletionModalOpen(true);
    setSelectedUser(userId);
  };
  const CloseConfirmDeletionModal = () => {
    setConfirmDeletionModalOpen(false);
  };
  const deleteTheUser = (userid) => {
    setConfirmDeletionModalOpen(false);
    deleteUserGQL({
      variables: { id: userid },
      refetchQueries: [{ query: GET_RESIDENTS }],
    });
  };

  const createUser = (data) => {
    createUserGQL({
      variables: {
        ...data,
      },
      refetchQueries: [{ query: GET_RESIDENTS }, { query: GET_PACKAGES }],
    });
    props.closeUserForm();
  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error:</p>}
      {data && (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Unit #</TableCell>
                  <TableCell align="right">Resident</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.unit.name}>
                    <TableCell component="th" scope="row">
                      {user.unit.name}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>

                    <TableCell align="right">
                      <Button color="secondary">
                        <DeleteIcon onClick={() => confirmDeletion(user.id)} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <ConfirmModal
        open={confirmDeletionModalOpen}
        close={CloseConfirmDeletionModal}
        confirm={() => deleteTheUser(selectedUser)}
      />
      <UserFormModal
        open={props.userFormOpen}
        close={props.closeUserForm}
        submit={createUser}
      />
    </>
  );
}
