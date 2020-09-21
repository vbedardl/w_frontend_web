import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery, gql, useMutation } from "@apollo/client";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmModal from "./confirmModal";
import UserFormModal from "./UserFormModal";
import Button from "@material-ui/core/Button";

const GET_RESIDENTS = gql`
  query($query: String) {
    users(query: $query) {
      id
      name
      email
      unit {
        name
      }
    }
  }
`;
const CREATE_USER = gql`
  mutation($name: String!, $password: String!, $email: String!, $unit: ID!) {
    createUser(name: $name, password: $password, email: $email, unit: $unit) {
      id
      email
      name
    }
  }
`;
const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      email
      name
    }
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_RESIDENTS);
  const [usersData, setUsersData] = useState([]);
  const [confirmDeletionModalOpen, setConfirmDeletionModalOpen] = useState(
    false
  );

  useEffect(() => {
    if (data) {
      setUsersData(data.users);
    }
  }, [data]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userFormOpen, setUserFormOpen] = useState(false);

  const [createUserGQL] = useMutation(CREATE_USER);
  const [deleteUserGQL] = useMutation(DELETE_USER);

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
  const openUserForm = () => {
    setUserFormOpen(true);
  };
  const closeUserForm = () => {
    setUserFormOpen(false);
  };
  const createUser = (data) => {
    console.log("To get user password:", data);
    createUserGQL({
      variables: {
        ...data,
      },
      refetchQueries: [{ query: GET_RESIDENTS }],
    });
    setUserFormOpen(false);
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => openUserForm()}
          >
            Add a user
          </Button>
        </>
      )}
      <ConfirmModal
        open={confirmDeletionModalOpen}
        close={CloseConfirmDeletionModal}
        confirm={() => deleteTheUser(selectedUser)}
      />
      <UserFormModal
        open={userFormOpen}
        close={closeUserForm}
        submit={createUser}
      />
    </>
  );
}
