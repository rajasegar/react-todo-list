import React, { useReducer, useEffect, useMemo } from 'react';
import './App.css';
import Header from './Header.jsx';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';
import TodoFilter from './TodoFilter.jsx';
import StateContext from './StateContext';
import { fetchAPITodos, generateID } from './api';
import appReducer from './reducers.js';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, {
    todos: [],
    filter: 'all',
  });

  useEffect(() => {
    fetchAPITodos().then((todos) => dispatch({ type: 'FETCH_TODOS', todos }));
  }, []);

  const filteredTodos = useMemo(() => {
    const { filter, todos } = state;
    switch (filter) {
      case 'active':
        return todos.filter((t) => t.completed === false);
      case 'completed':
        return todos.filter((t) => t.completed === true);
      default:
      case 'all':
        return todos;
    }
  }, [state]);

  function addTodo(title) {
    dispatch({ type: 'ADD_TODO', title });
  }

  function toggleTodo(id) {
    dispatch({ type: 'TOGGLE_TODO', id });
  }

  function filterTodos(filter) {
    dispatch({ type: 'FILTER_TODOS', filter });
  }

  function removeTodo(id) {
    dispatch({ type: 'REMOVE_TODO', id });
  }

  return (
    <StateContext.Provider value={filteredTodos}>
      <div style={{ width: 400 }}>
        <Header />
        <AddTodo addTodo={addTodo} />
        <hr />
        <TodoList toggleTodo={toggleTodo} removeTodo={removeTodo} />
        <hr />
        <TodoFilter filter={state.filter} filterTodos={filterTodos} />
      </div>
    </StateContext.Provider>
  );
}
