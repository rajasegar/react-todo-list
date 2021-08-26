import React from 'react';
import TodoItem from './TodoItem.jsx';
import { useObserver } from 'mobx-react';
import { useTodoStore } from './hooks';

export default function TodoList() {
  const todoStore = useTodoStore();
  return useObserver(() =>
    todoStore.filteredTodos.map((item) => (
      <TodoItem key={item.id} item={item} />
    )),
  );
}
