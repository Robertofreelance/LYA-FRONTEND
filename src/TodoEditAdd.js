import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v1 as uuidv1 } from "uuid";


export default function FormDialog(props) {
  const { handleClose, AddTodoList, todo, loading } = props;
  const [newTodo, setNewTodo] = useState(
    todo ? todo : { descripcion: "", status: false, id: uuidv1() }
  );
  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle>{todo ? "Editar tarea" : "Nueva Tarea"}</DialogTitle>
      <DialogContent>
        
          
            <DialogContentText>
              De una descripción de la tarea:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="descripcion"
              label="Descripción"
              onChange={(ev) =>
                setNewTodo({ ...newTodo, descripcion: ev.target.value })
              }
              type="text"
              fullWidth
              value={newTodo.descripcion}
            />
          
        
      </DialogContent>
      {!loading && (
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => AddTodoList(newTodo)}
            color="primary"
          >
            {todo ? "Editar" : "Crear"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
