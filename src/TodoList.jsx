import React from 'react';
import TodoItem from './TodoItem.jsx';
import { inject, observer } from 'mobx-react';

export default inject('todoStore')(
  observer(function TodoList({ todoStore }) {
    return todoStore.filteredTodos.map((item) => (
      <TodoItem key={item.id} item={item} />
    ));
  }),
);
