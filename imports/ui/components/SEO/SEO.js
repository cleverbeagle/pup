import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

const seoImages = {
  facebook: [
    'open-graph-facebook.png',
  ],
  twitter: [
    'open-graph-twitter.png',
  ],
  google: [
    'open-graph-google.png',
  ],
};

const seoImageURL = file => `https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/${file}`;
const seoURL = path => Meteor.absoluteUrl(path);

const getMetaTags = ({
  title, description, url, contentType, images, published, updated, category, tags, twitter,
}) => {
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { itemprop: 'image', content: (images && images.google) || seoImageURL(_.sample(seoImages.google)) },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@clvrbgl' },
    { name: 'twitter:title', content: `${title} | Clever Beagle` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: `@${twitter}` || '@clvrbgl' },
    { name: 'twitter:image:src', content: (images && images.twitter) || seoImageURL(_.sample(seoImages.twitter)) },
    { name: 'og:title', content: `${title} | Clever Beagle` },
    { name: 'og:type', content: contentType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: (images && images.facebook) || seoImageURL(_.sample(seoImages.facebook)) },
    { name: 'og:description', content: description },
    { name: 'og:site_name', content: 'Clever Beagle' },
    { name: 'fb:app_id', content: '196001354345637' },
  ];

  if (published) metaTags.push({ name: 'article:published_time', content: published });
  if (updated) metaTags.push({ name: 'article:modified_time', content: updated });
  if (category) metaTags.push({ name: 'article:section', content: category });
  if (tags) metaTags.push({ name: 'article:tag', content: tags });

  return metaTags;
};

const SEO = ({
  schema, title, description, path, contentType, published, updated, category, tags, twitter,
}) => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    }}
    title={title}
    link={[
      { rel: 'canonical', href: seoURL(path) },
    ]}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: seoURL(path),
      published,
      updated,
      category,
      tags,
      twitter,
    })}
  />
);

SEO.defaultProps = {
  schema: null,
  path: null,
  updated: null,
  category: null,
  tags: [],
  twitter: null,
  images: {},
};

SEO.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  twitter: PropTypes.string,
  images: PropTypes.object,
};

export default SEO;
