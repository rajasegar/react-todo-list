import { generateID } from './api';
import { combineReducers } from 'redux';

function filter(state = 'all', action) {
  if (action.type === 'FILTER_TODOS') {
    return action.filter;
  } else {
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'FETCH_TODOS':
      return action.todos;

    case 'ADD_TODO':
      const newTodo = {
        id: generateID(),
        title: action.title,
        completed: false,
      };

      return [newTodo, ...state];

    case 'TOGGLE_TODO':
      return state.map((t) => {
        if (t.id === action.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }, []);

    case 'REMOVE_TODO':
      return state.filter((t) => t.id !== action.id);

    default:
      return state;
  }
}

const appReducer = combineReducers({ todos, filter });
export default appReducer;
