import React from 'react';
import { render } from 'react-dom';
import KanbanBoard from './containers/KanbanBoard.js';

render(
  <KanbanBoard url="/kanban/cards" pollInterval={1000} />,
  document.getElementById('app')
);