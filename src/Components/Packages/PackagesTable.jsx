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
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import chrono from "../../utils/chrono";
import { GET_PACKAGES, MARK_AS_PICKEDUP } from "../../utils/Queries";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    width: "50%",
    alignSelf: "center",
    margin: "1em",
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
    console.log("the selected ackage id:", selectedPackage);
    updatePackageGQL({
      variables: { id: selectedPackage },
      refetchQueries: [{ query: GET_PACKAGES }],
    });
    setChecked(false);
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
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">Pick up</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.packages.map((pack) => (
                  <TableRow key={pack.id}>
                    <TableCell component="th" scope="row">
                      {pack.owner.name}
                    </TableCell>
                    <TableCell align="right">{pack.owner.unit.name}</TableCell>
                    <TableCell align="right">
                      {chrono(new Date() - new Date(pack.createdAt))}
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        disabled={
                          checked && selectedPackage !== pack.id ? true : false
                        }
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
              className={classes.button}
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
