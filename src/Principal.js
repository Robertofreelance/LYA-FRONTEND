import React from "react";
import {
  Button,
  withStyles,
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";

const headCells = [
  {
    id: "descripción",

    disablePadding: false,
    label: "Descrición de tarea",
    align: "center",
  },
  {
    id: "estado",
    align: "center",
    disablePadding: false,
    label: "Estado de tarea",
  },
  {
    id: "editar",
    align: "center",
    disablePadding: false,
    label: "Editar tarea",
  },
  {
    id: "eliminar",
    align: "center",
    disablePadding: false,
    label: "Eliminar tarea",
  },
];

const GreenButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800],
    },
  },
}))(Button);

function Cabecera() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    backgroundColor: theme.palette.common.table,
    borderRadius: 8,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  formControl: {
    width: 190,
    maxWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Principal(props) {
  const classes = useStyles();
  const {
    todoList,
    changeStatus,
    handleOpen,
    handleExternalOpen,
    deleteList,
    setFilter,
    filter
  } = props;
  return (
    <div className={classes.root}>
      <Box width="100%" height="100%" p={3}>
        <Paper>
          <Box p={2}>
            <Typography variant="h4" align="center" component="h2">
              TODO LIST
            </Typography>

            <Box
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>
                <TextField
                  id="standard-basic"
                  label="Buscar tarea"
                  value={filter}
                  onChange={(ev) => setFilter(ev.target.value)}
                />
              </Box>
              <br />
              <Grid
                spacing={3}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  justifyContent="center"
                  alignItems="center"
                  container
                  item
                  xs={12}
                  md={6}
                >
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="primary"
                  >
                    Añadir nueva tarea
                  </Button>
                </Grid>
                <Grid
                  justifyContent="center"
                  alignItems="center"
                  container
                  item
                  xs={12}
                  md={6}
                >
                  <Button
                    onClick={handleExternalOpen}
                    variant="contained"
                    color="primary"
                  >
                    Añadir tareas externas
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <br />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <Cabecera classes={classes} rowCount={todoList.length} />
            <TableBody>
              {todoList.map((todo) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={todo.id}>
                  <TableCell align="center">{todo.descripcion}</TableCell>
                  <TableCell align="center">
                    {todo.status ? (
                      <GreenButton onClick={() => changeStatus(todo)}>
                        COMPLETADA
                      </GreenButton>
                    ) : (
                      <Button
                        onClick={() => changeStatus(todo)}
                        variant="contained"
                        color="secondary"
                      >
                        PENDIENTE
                      </Button>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={() => handleOpen(todo)}
                      variant="contained"
                      color="primary"
                    >
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => deleteList(todo.id)}
                      variant="contained"
                      color="secondary"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
