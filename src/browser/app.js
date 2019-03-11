import React from 'react';
import Home from './home';
import Careers from './careers';
import Contact from './contact';
import { withRouter, Route } from 'react-router-dom';
import './styles/app.scss';

class App extends React.Component {
  componentDidMount() {
    this.fixWidows();
  }

  componentDidUpdate() {
    this.fixWidows();
  }

  // globally fixes typographic widows, inspired by https://bit.ly/2VR8fQ7
  fixWidows() {
    const els = document.querySelectorAll('h2, p');

    const insertNbsp = (el) => {
      const noWidowAtt = el.getAttribute('data-nowidow');
      const noWidow = noWidowAtt && noWidowAtt === 'true';
      if (noWidow) return;

      const html = el.innerHTML;
      el.innerHTML = html.replace(/ ([^ ]*)$/,'&nbsp;$1');
    };

    els.forEach((el) => insertNbsp(el));
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/" component={Home} exact={true} />
        <Route path="/careers" component={Careers} exact={true} />
        <Route path="/contact" component={Contact} exact={true} />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
