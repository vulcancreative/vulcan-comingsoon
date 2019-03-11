import React from 'react';
import Intro from './common/intro';
import './styles/contact.scss';

class Contact extends React.Component {
  render() {
    return (
      <div className="contact">
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
      </div>
    );
  }
}

export default Contact;
