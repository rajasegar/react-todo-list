import React, { useState, useEffect, useMemo } from 'react';
import { createStore } from 'redux';
import './App.css';
import Header from './Header.jsx';
import ConnectedAddTodo from '../containers/ConnectedAddTodo';
import ConnectedTodoList from '../containers/ConnectedTodoList';
import ConnectedTodoFilter from '../containers/ConnectedTodoFilter';
import { fetchAPITodos } from '../api';
import appReducer from '../reducers';

const initialState = { todos: [], filter: 'all' };
const store = createStore(appReducer, initialState);
const { dispatch } = store;

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchAPITodos().then((todos) => dispatch({ type: 'FETCH_TODOS', todos }));
  }, []);

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
