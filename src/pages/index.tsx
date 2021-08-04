import React from 'react';
import { graphql } from 'gatsby';
import HeroCarousel from '../components/HeroCarousel';
import { LandingPage } from '../components/Layout';
import Button from '../components/Button';
import Header from '../components/Header';
import Features from '../components/Feature';
import FreeSoftware from '../components/FreeSoftware';
import Footer from '../components/Footer';
import Sponsors from '../components/Sponsors';
import Volunteers from '../components/Volunteers';
import Clients from '../components/Clients';
import Providers from '../components/Providers';
import CallToAction from '../components/CallToAction';

export const query = graphql`
  query HeroSlides {
    allHeroJson {
      nodes {
        alt
        image {
          childImageSharp {
            fluid {
              srcWebp
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  return (
    <LandingPage>
      <Header mainClasses={'z-10'} />
      <HeroCarousel header={true} slides={data.allHeroJson.nodes}>
        <div className="flex flex-col w-full items-center">
          <div className="relative w-full px-6 pt-32 pb-10 lg:pt-64 lg:pb-48 z-20 flex flex-col items-center justify-center">
            <h1 className="text-white text-center text-4xl font-extrabold mb-14 lg:mb-6 lg:text-6xl">
              The Free Software Media System
            </h1>
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                external
                variant="primary-outline"
                href="https://demo.jellyfin.org/stable"
              >
                See it in Action
              </Button>
              <Button variant="primary" href="/downloads">
                Download Now
              </Button>
              <Button variant="primary-outline" href="#">
                Learn More
              </Button>
            </div>
          </div>
          <Features />
        </div>
      </HeroCarousel>
      <main>
        <FreeSoftware />
        <Volunteers />
        <Providers />
        <Sponsors />
        <Clients />
        <CallToAction />
      </main>
      <Footer />
    </LandingPage>
  );
};

export default IndexPage;
