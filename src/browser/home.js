import React from 'react';
import Intro from './common/intro';
import MetaTags from 'react-meta-tags';
import { withRouter } from 'react-router-dom';
import { fixWidows, viewportSize } from './util/dom';

import homeworksUIDesktop from './images/homeworks-ui-desktop.jpg';
import mywarrantBrandDesktop from './images/mywarrant-brand-desktop.jpg';
import tomferryUIDesktop from './images/tomferry-ui-desktop.jpg';
import wardsshedsUIDesktop from './images/wardssheds-ui-desktop.jpg';

import mywarrantBrandMobile from './images/mywarrant-brand-mobile.jpg';
import tomferryUIMobile from './images/tomferry-ui-mobile.jpg';
import wardsshedsUIMobile from './images/wardssheds-ui-mobile.jpg';

import './styles/home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewportWidth: viewportSize().x,
      meta: {
        title: "Vulcan, the full-service creative agency",
        description: "Vulcan is a quirky creative agency, " +
        "specializing in building products, sharpening brands, and " +
        "delivering memorable experiences.",
      },
    };
  }

  componentDidMount() {
    fixWidows();

    if (process.env.BROWSER) {
      this.updateViewportWidth = () => {
        this.setState({ viewportWidth: viewportSize().x });
      };

      this.handleResize = () => {
        this.updateViewportWidth();
        fixWidows();
      };

      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    if (process.env.BROWSER) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  render() {
    const { history } = this.props;
    const { meta, viewportWidth } = this.state;

    const showSmall = viewportWidth < 1000;
    const canonical = `https://vulcanca.com${history.location.pathname}`;
    const ogImg = `https://vulcanca.com/vulcan-og-yellow.jpg`;

    const homeworksLink = "https://homeworksenergy.com/";
    const mywarrantLink = "https://dribbble.com/shots/" +
      "4851776-MyWarrant-Brandbooks";
    const tomferryLink = "https://dribbble.com/shots/" +
      "7028110-TomFerry-On-Demand-Video-Mobile";
    const wardsshedsLink = "https://dribbble.com/shots/" +
      "4185275-Wards-Sheds-Builder";

    const homeworksImageStyle = {
      'backgroundImage': `url('${homeworksUIDesktop}')`,
      'backgroundPosition': showSmall ? 'center center' : 'center right',
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'contain',
    };

    const mywarrantImageStyle = {
      'backgroundImage': `url('${
        showSmall ? mywarrantBrandMobile : mywarrantBrandDesktop
      }')`,
      'backgroundPosition': showSmall ? 'center center' : 'top left',
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'contain',
    };

    const tomferryImageStyle = {
      'backgroundImage': `url('${
        showSmall ? tomferryUIMobile : tomferryUIDesktop
      }')`,
      'backgroundPosition': showSmall ? 'center center' : 'bottom right',
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'contain',
    };

    const wardsshedsImageStyle = {
      'backgroundImage': `url('${
        showSmall ? wardsshedsUIMobile : wardsshedsUIDesktop
      }')`,
      'backgroundPosition': showSmall ? 'center center' : 'bottom right',
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'contain',
    };

    return (
      <div className="home">
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
        <Intro className="yellow">
          <h1>
            Vulcan
          </h1>
          <p>
            Is a full-service design and development agency, with offices
            in New Hampshire, Germany, and Thailand. In our short history,
            we have had the pleasure of working with clients like
            HomeWorks Energy, MassSave, T-Pain, Tom Ferry, the United
            Nations, the University of Massachusetts, Wards Sheds,
            and Zappos.
          </p>
          <p>
            We feel it’s obvious, but this is merely a placeholder, while
            we finish our actual site. Ya know, cobbler&rsquo;s kids
            and all that. In the meantime, please enjoy a small sampling
            of our recent work, below!
          </p>
        </Intro>
        <div className="work">
          <div
            className="project homeworks"
            itemScope itemType="http://schema.org/CreativeWork"
          >
            <div className="info">
              <h2 itemProp="headline">
                Homework for HomeWorks
              </h2>
              <p itemProp="about">
                HomeWorks Energy of Boston MA, in partnership with the
                Mass Save program, hired us to revitalize their brand,
                perform market research, redesign their marketing site,
                and develop their internal tools.
              </p>
              <a
                href={homeworksLink}
                rel="noopener noreferrer"
                target="_blank"
                itemProp="url"
              >
                See Their Site
              </a>
            </div>
            <div
              className="image"
              style={homeworksImageStyle}
              itemProp="exampleOfWork"
            />
          </div>
          <div
            className="project mywarrant"
            itemScope itemType="http://schema.org/CreativeWork"
          >
            <div className="info">
              <h2 itemProp="headline">
                Peace of mind&nbsp;in&nbsp;the MyWarrant brand
              </h2>
              <p itemProp="about">
                T-Pain and his producer MeMpHiTz asked us to brand and
                conceptualize their new travel and traffic safety
                application – MyWarrant. Now we’re developing their
                digital product!
              </p>
              <a
                href={mywarrantLink}
                rel="noopener noreferrer"
                target="_blank"
                itemProp="url"
              >
                Learn More
              </a>
            </div>
            <div
              className="image"
              style={mywarrantImageStyle}
              itemProp="exampleOfWork"
            />
          </div>
          <div
            className="project tomferry"
            itemScope itemType="http://schema.org/CreativeWork"
          >
            <div className="info">
              <h2 itemProp="headline">
                Life, by design – TomFerry, by Vulcan
              </h2>
              <p itemProp="about">
                TomFerry brought us aboard for the product development of
                a revolutionary, highly-scalable edutainment platform to
                host, sell, and distribute their on-demand and live stream
                content to clients from Boston to Bangkok.
              </p>
              <a
                href={tomferryLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                Launch The App
              </a>
            </div>
            <div
              className="image"
              style={tomferryImageStyle}
              itemProp="exampleOfWork"
            />
          </div>
          <div
            className="project wardssheds"
            itemScope itemType="http://schema.org/CreativeWork"
          >
            <div className="info">
              <h2 itemProp="headline">
                The re-Wards of a modern app
              </h2>
              <p itemProp="about">
                The largest custom shed company in New Hampshire asked
                us to help modernize their marketing strategy. To do
                this, we brought their brand design, product development,
                and distribution channels to new heights!
              </p>
              <a
                href={wardsshedsLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                How It Works
              </a>
            </div>
            <div
              className="image"
              style={wardsshedsImageStyle}
              itemProp="exampleOfWork"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
