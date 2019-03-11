import React from 'react';
import Intro from './common/intro';
import './styles/careers.scss';

class Careers extends React.Component {
  render() {
    return (
      <div className="careers">
        <Intro className="magenta">
          <h1>
            Passion
          </h1>
          <p>
            It’s in everything you do. You create because you can’t not.
            You scheme because you wake. You whistle while you work. We
            like that – you delightful, loud, multitasking weirdo, you!
          </p>
          <p>
            We’re a similarly-minded, rag-tag group of creatives and
            engineers, working hard and day-drinking the week away. With
            folks on the ground in Portsmouth NH,  Heidelberg DE, and
            Bangkok TH, there’s plenty of fun to go around. In office, or
            out-and-about doing your thing, we’re just happy to have
            you along for the ride!
          </p>
        </Intro>
      </div>
    );
  }
}

export default Careers;
