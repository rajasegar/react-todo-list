import React, { useReducer, useEffect, useMemo } from 'react';
import './App.css';
import Header from './Header.jsx';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';
import TodoFilter from './TodoFilter.jsx';
import StateContext from './StateContext';
import { fetchAPITodos, generateID } from './api';
import appReducer from './reducers.js';
import { useTodoStore } from './hooks';

export default function App() {
  const todoStore = useTodoStore();
  const [state, dispatch] = useReducer(appReducer, {
    todos: [],
    filter: 'all',
  });

  useEffect(() => {
    todoStore.fetch();
  }, [todoStore]);

  return (
    <div style={{ width: 400 }}>
      <Header />
      <AddTodo />
      <hr />
      <TodoList />
      <hr />
      <TodoFilter />
    </div>
  );
}
