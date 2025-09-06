import {
  SiAndroid,
  SiApple,
  SiAppletv,
  SiArchlinux,
  SiCentos,
  SiDebian,
  SiDiscord,
  SiDocker,
  SiDotnet,
  SiFedora,
  SiGentoo,
  SiIos,
  SiKodi,
  SiLg,
  SiLinux,
  SiRoku,
  SiSailfishos,
  SiUbuntu
} from '@icons-pack/react-simple-icons';
import Icon from '@mdi/react';
import { mdiMonitor, mdiWeb } from '@mdi/js';
import clsx from 'clsx';
import React from 'react';

import Platform from '../../data/platform';

const PlatformIcon = ({
  platform,
  size,
  className = ''
}: {
  platform: Platform;
  size: string | number;
  className?: string;
}) => {
  className = clsx(className, 'fill--white');

  switch (platform) {
    // TODO: AndroidTV should have a unique icon
    case Platform.Android:
    case Platform.AndroidTV:
      return <SiAndroid size={size} className={className} />;

    case Platform.Arch:
      return <SiArchlinux size={size} className={className} />;

    case Platform.Browser:
      return <Icon path={mdiWeb} size={`${size}px`} className={className} />;

    case Platform.CentOS:
      return <SiCentos size={size} className={className} />;

    case Platform.Desktop:
      return <Icon path={mdiMonitor} size={`${size}px`} className={className} />;

    case Platform.Debian:
      return <SiDebian size={size} className={className} />;

    case Platform.Discord:
      return <SiDiscord size={size} className={className} />;

    case Platform.Docker:
      return <SiDocker size={size} className={className} />;

    case Platform.DotNet:
      return <SiDotnet size={size} className={className} />;

    case Platform.Fedora:
      return <SiFedora size={size} className={className} />;

    case Platform.FireOS:
      // Not available in simple-icons because it was removed (https://github.com/simple-icons/simple-icons/pull/13056)
      // using the SVG from an older version instead
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} className={className} viewBox='0 0 24 24'>
          <path d='M20.196 15.12c.265.337-.294 1.73-.542 2.353-.077.19.085.266.257.123 1.106-.926 1.39-2.867 1.166-3.149-.226-.277-2.16-.516-3.341.314-.183.127-.151.304.05.279.665-.08 2.147-.257 2.41.08m-.858.981c-2.064 1.523-5.056 2.333-7.632 2.333-3.611 0-6.862-1.334-9.322-3.555-.194-.176-.02-.414.21-.28 2.655 1.545 5.939 2.477 9.328 2.477 2.287 0 4.803-.476 7.115-1.458.348-.147.642.231.3.483m2.034-3.155a.388.388 0 0 1-.201-.04c-.041-.026-.087-.1-.133-.225l-1.734-4.355a1.79 1.79 0 0 0-.046-.117.266.266 0 0 1-.023-.108c0-.084.049-.128.146-.128h.58c.098 0 .165.014.205.04.04.026.082.102.127.226l1.344 3.823 1.343-3.823c.046-.124.089-.2.128-.226a.402.402 0 0 1 .205-.04h.54c.1 0 .148.044.148.128a.3.3 0 0 1-.025.108c-.016.04-.032.078-.044.117l-1.727 4.355c-.045.124-.09.199-.132.225a.388.388 0 0 1-.201.04zm-3.644.068c-.929 0-1.392-.463-1.392-1.392V8.739h-.706c-.13 0-.197-.066-.197-.196v-.246a.22.22 0 0 1 .045-.147c.03-.031.086-.055.171-.067l.717-.09.127-1.215c.013-.13.082-.196.207-.196h.41c.13 0 .196.066.196.196v1.196h1.276c.13 0 .195.065.195.197v.372c0 .13-.064.196-.195.196h-1.276v2.834c0 .243.055.411.162.51.108.098.293.147.555.147.124 0 .277-.016.46-.049.099-.02.164-.03.197-.03.052 0 .088.014.108.044.02.03.029.077.029.142v.266a.366.366 0 0 1-.04.19c-.026.043-.078.078-.157.103a3.018 3.018 0 0 1-.892.118m-4.665-2.976c.006-.052.011-.137.011-.255 0-.399-.094-.698-.28-.901-.186-.204-.46-.306-.818-.306-.412 0-.732.123-.962.369-.228.245-.36.61-.392 1.093zm-.942 3.07c-.803 0-1.411-.222-1.824-.667-.412-.444-.616-1.102-.616-1.972 0-.83.204-1.475.616-1.937.413-.46.988-.691 1.728-.691.62 0 1.098.176 1.432.524.332.351.5.846.5 1.487 0 .21-.017.422-.05.638-.014.077-.034.13-.064.156-.029.027-.077.04-.142.04h-3.08c.013.563.154.977.418 1.245.265.268.674.403 1.23.403.196 0 .385-.014.564-.04a5.04 5.04 0 0 0 .682-.166l.117-.035a.284.284 0 0 1 .09-.016c.085 0 .125.06.125.177v.276c0 .085-.012.144-.037.18a.441.441 0 0 1-.167.114 3.38 3.38 0 0 1-.701.205 4.236 4.236 0 0 1-.82.079m-5.424-.147c-.13 0-.195-.066-.195-.197v-4.58c0-.13.064-.195.195-.195h.432c.064 0 .116.012.153.039.036.025.06.076.072.146l.07.55c.176-.19.343-.34.499-.452a1.725 1.725 0 0 1 1.02-.323c.079 0 .158.003.235.01.112.014.168.072.168.176v.53c0 .117-.058.177-.178.177-.058 0-.114-.004-.17-.01a1.638 1.638 0 0 0-.18-.01c-.524 0-.973.157-1.346.47v3.472c0 .131-.066.197-.195.197zm-2.249 0c-.13 0-.196-.066-.196-.197v-4.58c0-.13.066-.195.196-.195h.579c.13 0 .195.064.195.195v4.58c0 .131-.065.197-.195.197zm.295-5.856c-.19 0-.339-.054-.447-.16a.581.581 0 0 1-.161-.428c0-.176.054-.318.16-.426.11-.109.257-.163.448-.163.189 0 .337.054.446.163.107.108.16.25.16.426a.581.581 0 0 1-.16.427.608.608 0 0 1-.446.161m-3.625 5.856c-.132 0-.197-.066-.197-.197v-4.01H.195c-.13 0-.195-.066-.195-.197v-.245c0-.065.014-.114.043-.147.03-.033.088-.055.173-.07l.705-.087v-.804c0-1.091.523-1.638 1.57-1.638.248 0 .51.036.784.109.072.019.122.047.152.088.029.038.044.107.044.205v.255c0 .124-.048.186-.148.186-.058 0-.14-.01-.248-.029-.11-.02-.23-.03-.369-.03-.3 0-.51.057-.633.172-.121.115-.181.303-.181.564v.903h1.324c.131 0 .197.064.197.195v.373c0 .13-.066.197-.197.197H1.892v4.01c0 .131-.065.197-.196.197Z' />
        </svg>
      );

    case Platform.Gentoo:
      return <SiGentoo size={size} className={className} />;

    case Platform.IOS:
      return <SiIos size={size} className={className} />;

    case Platform.Kodi:
      return <SiKodi size={size} className={className} />;

    case Platform.Linux:
      return <SiLinux size={size} className={className} />;

    case Platform.MacOS:
      return <SiApple size={size} className={className} />;

    case Platform.Roku:
      return <SiRoku size={size} className={className} />;

    case Platform.SailfishOS:
      return <SiSailfishos size={size} className={className} />;

    case Platform.TVOS:
      return <SiAppletv size={size} className={className} />;

    case Platform.Ubuntu:
      return <SiUbuntu size={size} className={className} />;

    case Platform.WebOS:
      return <SiLg size={size} className={className} />;

    case Platform.Windows:
      // Not available in simple-icons because it was removed due to Microsoft (https://github.com/simple-icons/simple-icons/issues/11236)
      // using the Font Awesome icon instead
      // Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} className={className} viewBox='0 0 448 512'>
          <path d='M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z' />
        </svg>
      );

    case Platform.Xbox:
      // Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} className={className} viewBox='0 0 640 640'>
          <path d='
            M433.9 382.2C478.2 436.5 498.6 481 488.3 500.9C480.4 516 431.6 545.5 395.7 556.8C366.1 566.1 327.3 570.1 295.3 567C257.1 563.3 218.4 549.6 185.2 528
            C157.3 509.8 151 502.3 151 487.4C151 457.5 183.9 405.1 240.2 345.3C272.2 311.4 316.7 271.6 321.6 272.7C331 274.8 405.9 347.8 433.9 382.2zM252.6 207.8
            C222.9 180.9 194.5 153.9 166.2 144.4C151 139.3 149.9 139.6 137.5 152.5C108.3 182.9 84 232.2 77.2 274.9C71.8 309.1 71.1 318.7 73 335.4
            C78.6 385.9 90.3 420.8 113.5 456.3C123 470.9 125.6 473.6 122.8 466.2C118.6 455.2 122.5 428.7 132.3 402.2C146.6 363.2 186.2 289.3 252.6 207.8z
            M564.2 271.3C547.3 191.3 496.7 141 489.6 141C482.3 141 465.4 147.5 453.6 154.9C430.3 169.4 412.6 186.3 389.3 207.7C431.7 261 491.5 347.1 512.2 410
            C519 430.7 521.9 451.1 519.6 462.3C517.9 470.8 517.9 470.8 521 466.9C527.1 459.2 540.9 435.6 546.4 423.4C553.8 407.2 561.4 383.2 565 364.7
            C569.3 342.2 568.9 293.9 564.2 271.3zM205.3 107C253 104.5 315 141.5 319.6 142.4C320.3 142.5 330 138.2 341.2 132.7C405.1 101.6 435.2 106.9 448.6 107.5
            C384.7 68.2 295.9 57.5 214.7 95.8C191.3 106.9 190.7 107.7 205.3 107z
            '/>
        </svg>
      );

    default:
      return null;
  }
};

export default PlatformIcon;
