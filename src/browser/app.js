import React from 'react';
import Home from './home';
import Careers from './careers';
import Contact from './contact';
import Position from './position';
import FourOhFour from './fourohfour';
import { fixWidows } from './util/dom';
import { withRouter, Route, Switch } from 'react-router-dom';
import './styles/app.scss';

const ScrollToTop = () => {
  if (process.env.BROWSER) window.scrollTo(0, 0);
  return null;
};

class App extends React.Component {
  componentDidMount() {
    if (process.env.BROWSER) {
      const { history } = this.props;

      this.fixWidows = () => fixWidows();
      window.addEventListener('resize', this.fixWidows);
      history.listen(() => this.fixWidows);
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

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/careers" component={Careers} exact />
          <Route path="/careers/:slug" component={Position} exact />
          <Route path="/contact" component={Contact} exact />
          <Route component={FourOhFour} status={404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
