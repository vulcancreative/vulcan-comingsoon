import React from 'react';
import { post } from './api';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import { fixWidows } from './util/dom';
import { withRouter } from 'react-router-dom';
import './styles/contact.scss';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: {
        title: "Vulcan, just reach out and say hi",
        description: "Vulcan is a full-service creative agency, with " +
        "offices in Londonderry, New Hampshire; Heidelberg, Germany; " +
        "and Bangkok, Thailand.",
      },
    };
  }

  componentDidMount() {
    fixWidows();
    this.resetForm();
  }

  componentWillUnmount() {
    this.resetForm();
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
      this.form.classList.remove('finished');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    post('/contact', this.form).then((response) => {
      console.log(response);
      if (response.ok) this.form.classList.add('finished');
    });
  }

  render() {
    const { history } = this.props;
    const { meta } = this.state;

    const canonical = `https://vulcanca.com${history.location.pathname}`;
    const ogImg = `https://vulcanca.com/vulcan-og-cyan.jpg`;

    return (
      <div className="contact">
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
            <div className="cover">
              <div className="handle" />
              <div className="info">
                <h1>Thanks!</h1>
                <p>
                  Our regular email-answering hours are, well, pretty
                  much always. What can we say? We like meeting people.
                </p>
                <p>
                  With that in mind, someone will get back to you within
                  1 business day &ndash; but, usually sooner!
                </p>
              </div>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              data-hj-whitelist
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
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
              placeholder="So, what’s crackin?"
              data-hj-whitelist
              required
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Contact);
