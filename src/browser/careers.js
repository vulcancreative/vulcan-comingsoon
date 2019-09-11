import React from 'react';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import { fixWidows } from './util/dom';
import { positions } from './data/positions';
import { withRouter, Link } from 'react-router-dom';
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
    const { history } = this.props;
    const { meta } = this.state;

    const canonical = `https://vulcanca.com${history.location.pathname}`;
    const ogImg = `https://vulcanca.com/vulcan-og-magenta.jpg`;

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

          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonical} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content={ogImg} />

          <meta property="twitter:card" content="summary" />
          <meta property="twitter:url" content={canonical} />
          <meta property="twitter:title" content={meta.title} />
          <meta property="twitter:image" content={ogImg} />
          <meta property="twitter:description"
            content={meta.description} />
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
            folks on the ground in Londonderry NH,  Heidelberg DE, and
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

export default withRouter(Careers);
