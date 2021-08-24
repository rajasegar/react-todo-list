import { makeObservable, observable, action, computed } from 'mobx';

import { fetchAPITodos, generateID } from './api';

export default class TodoStore {
  todos = [];
  filter = 'all';

  constructor() {
    makeObservable(this, {
      // values
      todos: observable,
      filter: observable,
      // computed
      filteredTodos: computed,
      // actions
      fetch: action,
      addTodo: action,
      toggleTodo: action,
      removeTodo: action,
      filterTodos: action,
    });
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((t) => t.completed === false);
      case 'completed':
        return this.todos.filter((t) => t.completed === true);
      default:
      case 'all':
        return this.todos;
    }
  }

  fetch() {
    fetchAPITodos().then((fetchedTodos) => {
      this.todos = fetchedTodos;
    });
  }

  addTodo(title) {
    this.todos.push({ id: generateID(), title, completed: false });
  }

  toggleTodo(id) {
    for (let todo of this.todos) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        break;
      }
    }
  }

  removeTodo(id) {
    let index = 0;
    for (let todo of this.todos) {
      if (todo.id === id) {
        break;
      } else {
        index++;
      }
    }
    this.todos.splice(index, 1);
  }

  filterTodos(filterName) {
    this.filter = filterName;
  }
}
