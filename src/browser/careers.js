import React from 'react';
import Intro from './common/intro';
import { fixWidows } from './util/dom';
import { Link } from 'react-router-dom';
import { positions } from './data/positions';
import './styles/careers.scss';

class Careers extends React.Component {
  componentDidMount() {
    fixWidows();
  }

  render() {
    const openings = positions.map((p) => {
      const loc = p.location;
      const locString = typeof loc === 'string' || loc instanceof String;

      const link = `/careers/${p.slug}`;

      return (
        <div className="opening" key={link}>
          <Link to={link}>
            {p.title}
          </Link>
          {
            locString &&
            <span className="location">
              – {loc}
            </span>
          }
          {
            !locString &&
            <span className="location">
              – {loc.city}<span className="area">, {loc.area}</span>
            </span>
          }
        </div>
      );
    });

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
        <div className="positions">
          <div className="title-container">
            <div className="title">
              Open Positions
            </div>
            <div className="hr" />
          </div>
          <div className="openings">
            {openings}
          </div>
        </div>
      </div>
    );
  }
}

export default Careers;
