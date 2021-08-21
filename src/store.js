import { observable, action, computed, decorate } from 'mobx';

import { fetchAPITodos, generateID } from './api';

export default class TodoStore {
  todos = [];
  filter = 'all';

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

  removeTodo(id) {}
}
