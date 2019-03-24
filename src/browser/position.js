import React from 'react';
import { post } from './api';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import Markdown from 'markdown-to-jsx';
import { fixWidows } from './util/dom';
import { isString } from './util/collection';
import { positions } from './data/positions';
import { withRouter, Link } from 'react-router-dom';
import './styles/position.scss';

class Position extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      abbr: null,
      slug: null,
      location: null,
      markdown: null,
      type: null,
    };
  }

  componentDidMount() {
    fixWidows();
    this.resetForm();
    this.findPosition();
  }

  componentWillUnmount() {
    this.resetForm();
  }

  componentDidUpdate(prevProps) {
    fixWidows();
    if (prevProps.markdown !== this.props.markdown) {
      this.findPosition();
    }
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
      this.form.classList.remove('finished');
    }
  }

  findPosition() {
    const { slug } = this.props.match.params;

    const position = positions.find((p) => p.slug === slug);
    this.setState({ ...position });
  }

  buildMeta(title, firstSection) {
    const descParts = firstSection.split(' ');

    let chars = 0;
    const max = 120;
    const chosen = [];
    for (let i = 0; i != descParts.length; i++) {
      const part = descParts[i];
      const len = part.length;

      chars += len;

      if (chars >= max) {
        chosen.push(part.replace(/\.,!;:/, ''));
        break;
      } else {
        chosen.push(part);
      }
    }

    const description = `${chosen.join(' ')}…`;

    return {
      title: `Vulcan, be our new ${title}`,
      description: description,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    post('/apply', this.form).then((response) => {
      console.log(response);
      if (response.ok) this.form.classList.add('finished');
    });
  }

  render() {
    const { history } = this.props;
    const { abbr, type, title, markdown } = this.state;
    if (!title || !markdown) return null;

    const canonical = `https://vulcanca.com${history.location.pathname}`;
    const ogImg = `https://vulcanca.com/vulcan-og-magenta.jpg`;

    const markdownOptions = {
      forceBlock: true,
      overrides: {
        Link: {
          component: Link,
        },
      },
    };

    const sections = markdown.split('\n\n');

    const loc = sections[0];
    const firstSection = sections[1];
    const latterSections = sections.slice(2, sections.length);

    const abbrValid = isString(abbr);

    let linkLabel = "Link to Resume";
    if (type === "design") {
      linkLabel = "Link to Portfolio";
    } else if (type === "engineering") {
      linkLabel = "Link to GitHub or Portfolio";
    }

    const meta = this.buildMeta(title, firstSection);

    return (
      <div className="position">
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
          <h1 className={`title ${abbrValid ? 'full' : ''}`}>
            {title}
          </h1>
          {
            abbrValid &&
            <h1 className="abbr">
              {abbr}
            </h1>
          }
          <Markdown options={markdownOptions}>
            {loc}
          </Markdown>
          <Markdown options={markdownOptions}>
            {firstSection}
          </Markdown>
        </Intro>
        <div className="details">
          <div className="title-container">
            <div className="title">
              Position Details
            </div>
            <div className="hr" />
          </div>
          <Markdown options={markdownOptions}>
            {latterSections.join('\n\n')}
          </Markdown>
          <form
            ref={(el) => { this.form = el; }}
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="cover">
              <div className="handle" />
              <div className="info">
                <h1>Hell Yeah!</h1>
                <p>
                  We&rsquo;re so excited that you&rsquo;re excited! The
                  folks on the other end of this automated response
                  can&rsquo;t wait to make your acquaintance!
                </p>
                <p>
                  Please keep in mind, whenever we put one of these
                  opportunities up, we have a tremendous amount of
                  interest (like&hellip; a lot). All fine and dandy, but
                  this sometimes means we can&rsquo;t reply to each inquiry
                  on a case-by-case basis. Sad, yes, but a fact of life.
                </p>
                <p>
                  With that in mind, if you our new best bud, someone
                  will be in-touch within 1 to 2 business days with
                  some additional info.
                </p>
              </div>
            </div>

            <input
              type="hidden"
              name="job"
              defaultValue={title}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              data-hj-whitelist
              required
            />

            <input
              type="url"
              name="link"
              placeholder={linkLabel}
              data-hj-whitelist
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              data-hj-whitelist
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              data-hj-whitelist
              required
            />

            <textarea
              name="msg"
              placeholder="Tell us about you. Why are you a good fit?"
              data-hj-whitelist
              required
            />

            <input type="submit" value="Apply" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Position);
