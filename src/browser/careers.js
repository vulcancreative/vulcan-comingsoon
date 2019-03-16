import React from 'react';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import { fixWidows } from './util/dom';
import { Link } from 'react-router-dom';
import { positions } from './data/positions';
import './styles/careers.scss';

class Careers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: {
        title: "Vulcan, be a part of the team",
        description: "Vulcan is ever hiring and always growing; if " +
        "you’re a Creative, UI/UX Designer, Full-Stack Engineer, or " +
        "just Other, it’s a pleasure to meet you!",
      },
    };
  }

  componentDidMount() {
    fixWidows();
  }

  render() {
    const { meta } = this.state;

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
              –&nbsp;{loc}
            </span>
          }
          {
            !locString &&
            <span className="location">
              –&nbsp;{loc.city}<span className="area">, {loc.area}</span>
            </span>
          }
        </div>
      );
    });

    return (
      <div className="careers">
        <MetaTags>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </MetaTags>
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
