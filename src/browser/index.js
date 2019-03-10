import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../shared/routes.js';
import { Route, BrowserRouter } from 'react-router-dom';

const browserRoutes = routes.map((r) => <Route key={r.path} {...r} />);

ReactDOM.render((
  <BrowserRouter>
    <React.Fragment>
      {browserRoutes}
    </React.Fragment>
  </BrowserRouter>
), document.getElementById('root'));
