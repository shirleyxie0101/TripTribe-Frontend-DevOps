import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  url: string;
  type: string;
  name: string;
  img: string;
};

const Seo: FC<SeoProps> = ({ title, description, url, type, name, img }) => {
  // const defaultUrl = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        property="og:url"
        content={url}
      />
      <meta
        property="og:type"
        content={type}
      />
      <meta
        name="title"
        property="og:title"
        content={title}
      />
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <meta
        name="image"
        property="og:image"
        content={img}
      />
      {/* <meta
        name="twitter:creator"
        content={name}
      />
      <meta
        name="twitter:card"
        content={type}
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      /> */}
    </Helmet>
  );
};

export default Seo;
