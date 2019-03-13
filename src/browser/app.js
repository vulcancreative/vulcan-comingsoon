import React from 'react';
import Home from './home';
import Careers from './careers';
import Contact from './contact';
import Position from './position';
import { fixWidows } from './util/dom';
import { withRouter, Route } from 'react-router-dom';
import './styles/app.scss';

const ScrollToTop = () => {
  if (process.env.BROWSER) window.scrollTo(0, 0);
  return null;
};

class App extends React.Component {
  componentDidMount() {
    if (process.env.BROWSER) {
      this.fixWidows = () => fixWidows();
      window.addEventListener('resize', this.fixWidows);
    }
  }

  componentWillUnmount() {
    if (process.env.BROWSER) {
      window.removeEventListener('resize', this.fixWidows);
    }
  }

  scrollToTop() {
    if (process.env.BROWSER) window.scrollTo(0, 0);
  }

  render() {
    return (
      <div id="app">
        <Route component={ScrollToTop} />
        <Route path="/" component={Home} exact />
        <Route path="/careers" component={Careers} exact />
        <Route path="/careers/:slug" component={Position} exact />
        <Route path="/contact" component={Contact} exact />
      </div>
    );
  }
}

export default withRouter(App);
