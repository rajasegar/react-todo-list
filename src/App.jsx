import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.jsx';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';
import TodoFilter from './TodoFilter.jsx';
import StateContext from './StateContext';
import { fetchAPITodos, generateID } from './api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], filteredTodos: [], filter: 'all' };

    this.fetchTodos = this.fetchTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    fetchAPITodos().then((todos) => {
      this.setState({ todos });
      this.filterTodos();
    });
  }

  addTodo(title) {
    const { todos } = this.state;
    const newTodo = { id: generateID(), title, completed: false };
    this.setState({ todos: [newTodo, ...todos] });
    this.filterTodos();
  }

  toggleTodo(id) {
    const { todos } = this.state;
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }, []);

    this.setState({ todos: newTodos });
    this.filterTodos();
  }

  filterTodos(filterArg) {
    this.setState(({ todos, filter }) => ({
      filter: filterArg || filter,
      filteredTodos: this.applyFilter(todos, filterArg || filter),
    }));
  }

  removeTodo(id) {
    const { todos } = this.state;
    const newTodos = todos.filter((t) => t.id !== id);
    this.setState({ todos: newTodos });
    this.filterTodos();
  }

  applyFilter(todos, filter) {
    switch (filter) {
      case 'active':
        return todos.filter((t) => t.completed === false);

      case 'completed':
        return todos.filter((t) => t.completed === true);

      default:
      case 'all':
        return todos;
    }
  }

  render() {
    const { filter, filteredTodos } = this.state;

    return (
      <StateContext.Provider value={filteredTodos}>
        <div style={{ width: 400 }}>
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <hr />
          <TodoList toggleTodo={this.toggleTodo} removeTodo={this.removeTodo} />
          <hr />
          <TodoFilter filter={filter} filterTodos={this.filterTodos} />
        </div>
      </StateContext.Provider>
    );
  }
}
