import React from 'react';
import Icon from '@mdi/react';
import {
  mdiPlayCircle,
  mdiTelevision,
  mdiLock,
  mdiCurrencyUsdOff
} from '@mdi/js';

const featureList = [
  {
    title: 'Your Media',
    path: mdiPlayCircle,
    description: (
      <>
        Enjoy your entire collection of movies, shows, music, photos and books
        in an easy to use and beautiful interface.
      </>
    )
  },
  {
    title: 'Live TV & DVR',
    path: mdiTelevision,
    description: (
      <>
        Watch your favorite sports and TV shows live,
        <br />
        or record them to catch up later.
      </>
    )
  },
  {
    title: 'No Fees',
    path: mdiCurrencyUsdOff,
    description: (
      <>
        Fully free, without any hidden cost or feature locked behind a premium
        subscription.
      </>
    )
  },
  {
    title: 'Privacy Focused',
    path: mdiLock,
    description: (
      <>
        Jellyfin is built around privacy-first.
        <br />
        You are control of everything and it never calls home.
      </>
    )
  }
];

function FeatureBlock({
  path,
  title,
  description
}: {
  path: any;
  title: string;
  description: JSX.Element;
  key: number;
}) {
  return (
    <div className="p-4 flex flex-col items-center text-white bg-gray-700 lg:bg-transparent mx-4 my-2 lg:m-0 bg-opacity-60">
      <Icon path={path} size={3} />
      <div className="mt-2">
        <h3 className="font-extrabold text-2xl text-center mb-2">{title}</h3>
        <p className="text-center mx-4">{description}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="z-20 lg:bg-gray-700 lg:bg-opacity-60 w-full flex justify-center">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-screen-2xl">
        {featureList.map((props, idx) => (
          <FeatureBlock key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
