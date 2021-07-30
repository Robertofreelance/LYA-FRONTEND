import React, { useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import Principal from "./Principal";
import GlobalStyles from "./GlobalStyles";
import TodoEditAdd from "./TodoEditAdd";
import AddFromExternal from "./AddFromExternal";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [todoList, setTodoList] = useState([
    {
      descripcion:
        "Este es un ejemplo largo para comprobar de que no se alargue el texto",
      status: true,
      id: uuidv1(),
    },
  ]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState({ open: false, todo: null });
  const [externalOpen, setExternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = (todo) => {
    setOpen({ open: !open.open, todo: todo || null });
  };
  const handleExternalOpen = () => {
    if (!loading) {
      setExternalOpen(!externalOpen);
    }
  };

  const AddTodoList = (todo) => {
    setOpen({ open: false, todo: null });
    setTodoList([{ ...todo }, ...todoList.filter((t) => t.id !== todo.id)]);
  };
  const changeStatus = (todo) => {
    setTodoList([
      { ...todo, status: !todo.status },
      ...todoList.filter((t) => t.id !== todo.id),
    ]);
  };
  const deleteList = (id) => {
    setTodoList([...todoList.filter((t) => t.id !== id)]);
  };
  const getFromList = (number) => {
    fetch(`https://catfact.ninja/facts?limit=${number}`)
      .then((response) => {
        console.log(loading);
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const newData = data.data.map((d) => {
          return { descripcion: d.fact, status: false, id: uuidv1() };
        });
        setTodoList([...newData, ...todoList]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleExternalOpen();
      });
  };

  const filterTodo = () => {
    if (filter === "") {
      return todoList;
    }
    return todoList.filter((todo) => {
      const regex = new RegExp("^" + filter, "i");
      return todo.descripcion.match(regex);
    });
  };
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Principal
        setFilter={setFilter}
        handleOpen={handleOpen}
        changeStatus={changeStatus}
        deleteList={deleteList}
        handleExternalOpen={handleExternalOpen}
        todoList={filterTodo()}
        filter={filter}
      />
      {open.open && (
        <TodoEditAdd
          todo={open.todo}
          AddTodoList={AddTodoList}
          handleClose={handleOpen}
          loading={loading}
        />
      )}
      {externalOpen && (
        <AddFromExternal
          handleClose={handleExternalOpen}
          getFromList={getFromList}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </MuiThemeProvider>
  );
}

export default App;
