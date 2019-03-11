import React from 'react';
import Header from './header';
import '../styles/common/intro.scss';

class Intro extends React.Component {
  render() {
    const { children, className } = this.props;

    return (
      <div className={`intro ${className}`}>
        <Header />
        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

export default Intro;
