import React, { useState } from "react";
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
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

const GET_PACKAGES = gql`
  query {
    packages {
      createdAt
      id
      pickedUp
    }
  }
`;
const MARK_AS_PICKEDUP = gql`
  mutation($id: ID!) {
    updatePackage(id: $id, data: { pickedUp: true }) {
      id
      pickedUp
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
  const { loading, error, data } = useQuery(GET_PACKAGES);
  const [checked, setChecked] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [updatePackageGQL] = useMutation(MARK_AS_PICKEDUP);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setSelectedPackage(event.target.value);
  };

  const updatePackage = () => {
    updatePackageGQL({
      variables: { id: selectedPackage },
      refetchQueries: [{ query: GET_PACKAGES }],
    });
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
                  <TableCell>Package for</TableCell>
                  <TableCell align="right">Resident's unit</TableCell>
                  <TableCell align="right">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.packages.map((pack) => (
                  <TableRow key={pack.id}>
                    <TableCell component="th" scope="row">
                      Residents name
                    </TableCell>
                    <TableCell align="right">Residents unit</TableCell>
                    <TableCell align="right">{pack.createdAt}</TableCell>
                    <TableCell align="right">
                      <Checkbox
                        value={pack.id}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {checked && (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => updatePackage()}
            >
              Mark package as picked up
            </Button>
          )}
        </>
      )}
    </>
  );
}
