import React from 'react';
import { post } from './api';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import { fixWidows } from './util/dom';
import './styles/contact.scss';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: {
        title: "Vulcan, just reach out and say hi",
        description: "Vulcan is a full-service creative agency, with " +
        "offices in Portsmouth, New Hampshire; Heidelberg, Germany; " +
        "and Bangkok, Thailand.",
      },
    };
  }

  componentDidMount() {
    fixWidows();
  }

  handleSubmit(e) {
    e.preventDefault();
    post('/contact', this.form).then((response) => console.log(response));
  }

  render() {
    const { meta } = this.state;

    return (
      <div className="contact">
        <MetaTags>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </MetaTags>
        <Intro className="cyan">
          <h1>
            Reach Out
          </h1>
          <p>
            and touch… us…? Or something that sounds a little less
            uncomfortable for all parties involved. No offense meant by
            it, we’re just busy working and poking us kinda screws
            up our flow.
          </p>
          <p>
            ANYWHO! Say something, anything. Tell us we’re pretty. Or
            better yet, we’d love to hear about your project!&nbsp;

            <span>
              How can we help?
            </span>
          </p>
        </Intro>
        <div className="touching">
          <div className="title-container">
            <div className="title">
              Contact Us
            </div>
            <div className="hr" />
          </div>
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
              type="text"
              name="company"
              placeholder="Company Name"
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
              placeholder="So, what’s crackin?"
              required
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
