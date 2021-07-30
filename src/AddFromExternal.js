import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Loading from "./Loading";
export default function FormDialog(props) {
  const { handleClose, getFromList, setLoading, loading } = props;
  const [amount, setAmount] = useState("0");

  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle>Añadir desde catninja API</DialogTitle>
      <DialogContent>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <DialogContentText>Ingrese la cantidad de :</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="descripcion"
              label="Descripción"
              onChange={(ev) => {
                if (ev.target.validity.valid) {
                  setAmount(ev.target.value);
                }
              }}
              type="number"
              fullWidth
              value={amount}
            />
          </Fragment>
        )}
      </DialogContent>
      {!loading && (
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setLoading(true);
              getFromList(amount);
            }}
            color="primary"
          >
            Importar
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
