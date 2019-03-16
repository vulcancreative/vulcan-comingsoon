import React from 'react';
import { post } from './api';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import Markdown from 'markdown-to-jsx';
import { fixWidows } from './util/dom';
import { isString } from './util/collection';
import { positions } from './data/positions';
import { Link, withRouter } from 'react-router-dom';
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
    this.findPosition();
  }

  componentDidUpdate(prevProps) {
    fixWidows();
    if (prevProps.markdown !== this.props.markdown) {
      this.findPosition();
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
    post('/apply', this.form).then((response) => console.log(response));
  }

  render() {
    const { abbr, type, title, markdown } = this.state;
    if (!title || !markdown) return null;

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
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
            />

            <input
              type="url"
              name="link"
              placeholder={linkLabel}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
            />

            <textarea
              name="message"
              placeholder="Tell us about you. Why are you a good fit?"
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
