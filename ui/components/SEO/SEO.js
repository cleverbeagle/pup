import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';
import { sample } from 'lodash';

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

const SEO = ({
  schema, title, description, images, path, contentType, published, updated, category, tags, twitter,
}) => (
  <Helmet>
    <html lang="en" itemScope itemType={`http://schema.org/${schema}`} />

    <title>{title}</title>
    <meta name="description" content={description} />
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description} />
    <meta itemProp="image" content={(images && images.google) || seoImageURL(sample(seoImages.google))} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@clvrbgl" />
    <meta name="twitter:title" content={`${title} | Pup`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:creator" content={`@${twitter}` || '@clvrbgl'} />
    <meta name="twitter:image:src" content={(images && images.twitter) || seoImageURL(sample(seoImages.twitter))} />

    <meta property="og:title" content={`${title} | Pup`} />
    <meta property="og:type" content={contentType} />
    <meta property="og:url" content={seoURL(path)} />
    <meta property="og:image" content={(images && images.facebook) || seoImageURL(sample(seoImages.facebook))} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Pup" />

    <meta name="fb:app_id" content="196001354345637" />

    {published ? <meta name="article:published_time" content={published} /> : ''}
    {updated ? <meta name="article:modified_time" content={updated} /> : ''}
    {category ? <meta name="article:section" content={category} /> : ''}
    {tags ? <meta name="article:tag" content={tags} /> : ''}
  </Helmet>
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
