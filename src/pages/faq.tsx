import React from 'react';
import { Disclosure } from '@headlessui/react';
import Icon from '@mdi/react';
import { mdiChevronUp } from '@mdi/js';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { graphql, Link } from 'gatsby';

export const query = graphql`
  query FaqContents {
    allFaqJson {
      nodes {
        name
        items {
          question
          answer
        }
      }
    }
  }
`;

const Faq = ({ data }) => {
  return (
    <Layout>
      <Header />
      <main className="flex flex-col flex-grow">
        <header className="bg-gray-700 text-white py-4">
          <div className="container mx-auto flex flex-col p-2 lg:p-4">
            <h1 className="font-black text-5xl">Frequently Asked Questions</h1>
          </div>
        </header>
        <div className="container flex-grow mx-auto flex flex-col p-2 lg:p-4 shadow-md bg-white">
          <p>
            This page aims to answer some frequently asked questions about
            Jellyfin. If you don't find an answer here, feel free to{' '}
            <Link
              className="transition-colors text-primary-700 hover:text-primary-500 font-semibold"
              to=""
            >
              ask the community
            </Link>
            .
          </p>
          <div className="flex flex-col gap-2">
            {data.allFaqJson.nodes.map((category) => (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl my-2">{category.name}</h2>
                {category.items.map((item) => (
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="transition-colors flex justify-between w-full px-4 py-2 text-left font-sans-title font-bold text-sm text-primary-900 rounded-md bg-primary-10 hover:bg-primary-25">
                          <span>{item.question}</span>
                          <Icon
                            path={mdiChevronUp}
                            className={`${
                              open ? 'transform rotate-180' : ''
                            } w-5 h-5`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                          {item.answer.map((paragraph) => (
                            <ReactMarkdown className="max-w-prose">
                              {paragraph}
                            </ReactMarkdown>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default Faq;
