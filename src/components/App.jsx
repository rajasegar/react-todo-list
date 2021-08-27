import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.jsx';
import ConnectedAddTodo from '../containers/ConnectedAddTodo';
import ConnectedTodoList from '../containers/ConnectedTodoList';
import ConnectedTodoFilter from '../containers/ConnectedTodoFilter';

export default function App({ fetchTodos }) {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div style={{ width: 400 }}>
      <Header />
      <ConnectedAddTodo />
      <hr />
      <ConnectedTodoList />
      <hr />
      <ConnectedTodoFilter />
    </div>
  );
}
