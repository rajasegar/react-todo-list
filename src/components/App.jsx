import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.jsx';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import TodoFilter from '../components/TodoFilter';
import { useDispatch } from 'react-redux';
import { fetchTodos } from '../actions';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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
