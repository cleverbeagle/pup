import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import SEO from '../../components/SEO';
import FetchData from '../../components/FetchData';
import BlankState from '../../components/BlankState';
import Comments from '../../components/Comments';
import { document as documentQuery } from '../../queries/Documents.gql';
import parseMarkdown from '../../../modules/parseMarkdown';

import { StyledViewDocument, DocumentBody } from './styles';

class ViewDocument extends React.Component {
  componentWillMount() {
    if (Meteor.isClient && document.body) document.body.classList.add('isViewDocument');
  }

  componentWillUnmount() {
    if (Meteor.isClient && document.body) document.body.classList.remove('isViewDocument');
  }

  render() {
    const { match } = this.props;
    return (
      <FetchData query={documentQuery} variables={{ _id: match.params._id }} pollInterval={500}>
        {({ loading, data }) => {
          if (!loading && data.document) {
            console.log(data.document);
            return (
              <React.Fragment>
                <StyledViewDocument>
                  <SEO
                    title={data.document && data.document.title}
                    description={data.document && data.document.body}
                    url={`documents/${data.document && data.document._id}`}
                    contentType="article"
                    published={data.document && data.document.createdAt}
                    updated={data.document && data.document.updatedAt}
                    twitter="clvrbgl"
                  />
                  <React.Fragment>
                    <h1>{data.document && data.document.title}</h1>
                    <DocumentBody
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(data.document && data.document.body),
                      }}
                    />
                  </React.Fragment>
                </StyledViewDocument>
                <Comments
                  documentId={data.document && data.document._id}
                  comments={data.document && data.document.comments}
                />
              </React.Fragment>
            );
          }

          if (!loading && !data.document) {
            return (
              <BlankState
                icon={{ style: 'solid', symbol: 'file-alt' }}
                title="No document here, friend!"
                subtitle="Make sure to double check the URL! If it's correct, this is probably a private document."
              />
            );
          }
        }}
      </FetchData>
    );
  }
}

ViewDocument.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ViewDocument;
