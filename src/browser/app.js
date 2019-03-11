import React from 'react';
import Home from './home';
import Careers from './careers';
import Contact from './contact';
import Position from './position';
import { withRouter, Route } from 'react-router-dom';
import './styles/app.scss';

const ScrollToTop = () => {
  if (process.env.BROWSER) window.scrollTo(0, 0);
  return null;
};

class App extends React.Component {
  componentDidMount() {
    this.fixWidows();
  }

  componentDidUpdate() {
    this.fixWidows();
  }

  scrollToTop() {
    if (process.env.BROWSER) window.scrollTo(0, 0);
  }

  // globally fixes typographic widows, inspired by https://bit.ly/2VR8fQ7
  fixWidows() {
    const els = document.querySelectorAll('h2, p');

    const insertNbsp = (el) => {
      if (el.classList.contains('widow-fix')) return;

      const html = el.innerHTML;
      el.innerHTML = html.replace(/ ([^ ]*)$/, '&nbsp;$1');
      el.classList.add('widow-fix');
    };

    els.forEach((el) => insertNbsp(el));
  }

  render() {
    return (
      <div className="app">
        <Route component={ScrollToTop} />
        <Route path="/" component={Home} exact={true} />
        <Route path="/careers" component={Careers} exact={true} />
        <Route path="/careers/:slug" component={Position} exact={true} />
        <Route path="/contact" component={Contact} exact={true} />
      </div>
    );
  }
}

export default withRouter(App);
