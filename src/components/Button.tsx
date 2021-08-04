import { Link } from 'gatsby';
import React from 'react';

const Button = ({
  children,
  href,
  external = false,
  target = '_blank',
  rel,
  variant
}: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
  variant: 'primary' | 'outline' | 'primary-outline';
}) => {
  const styleClass = `${
    variant === 'primary-outline'
      ? 'border-2 border-primary-500 hover:bg-primary-500'
      : 'bg-primary-500 hover:bg-primary-700'
  } text-white text-lg font-bold transition-colors py-2 px-4 rounded-full text-center`;
  if (external) {
    return (
      <a className={styleClass} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  } else {
    return (
      <Link className={styleClass} to={href} target={target} rel={rel}>
        {children}
      </Link>
    );
  }
};

export default Button;
