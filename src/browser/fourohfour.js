import React from 'react';
import Header from './common/header';
import MetaTags from 'react-meta-tags';
import { fixWidows } from './util/dom';
import { withRouter, Link } from 'react-router-dom';
import './styles/fourohfour.scss';

class FourOhFour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: {
        title: "Vulcan, even we make mistakes",
        description: "Well, we did it, it broke. Are you happy now? " +
          "Cause we aren't…",
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
    const ogImg = `https://vulcanca.com/vulcan-og-yellow.jpg`;

    return (
      <div className="four-oh-four">
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
        <Header />
        <div className="failure">
          <h1>Ah, dammit…</h1>
          <p>
            Well, we did it, it broke. Are you happy now?
            Cause we certainly aren&rsquo;t…
          </p>
          <p>
            Probably but a temporary oversight, but you know better
            safe than sorry. What do you say we go home and
            start anew?
          </p>
          <Link to="/" className="home">
            Take Me There
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(FourOhFour);
