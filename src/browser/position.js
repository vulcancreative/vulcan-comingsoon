import React from 'react';
import Intro from './common/intro';
import Markdown from 'markdown-to-jsx';
import { positions } from './data/positions';
import { Link, withRouter } from 'react-router-dom';
import './styles/position.scss';

class Position extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      slug: null,
      location: null,
      markdown: null,
    };
  }

  componentDidMount() {
    this.findPosition();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markdown !== this.props.markdown) {
      this.findPosition();
    }
  }

  findPosition() {
    const { slug } = this.props.match.params;

    const position = positions.find((p) => p.slug === slug);
    this.setState({ ...position });
  }

  render() {
    const { title, markdown } = this.state;
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

    const firstSection = sections[0];
    const latterSections = sections.slice(1, sections.length);

    console.log(latterSections);

    return (
      <div className="position">
        <Intro className="magenta">
          <h1 className="title">
            {title}
          </h1>
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
        </div>
      </div>
    );
  }
}

export default withRouter(Position);
