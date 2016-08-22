import React from 'react';
import { render } from 'react-dom';
import Kanban from './containers/Kanban';

render(
  <KanbanBoard url="/kanban/cards" pollInterval={1000} />,
  document.getElementById('app')
);