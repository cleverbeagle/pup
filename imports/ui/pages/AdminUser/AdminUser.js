/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import AdminUserProfile from '../../components/AdminUserProfile/AdminUserProfile';
import UserSettings from '../../components/UserSettings/UserSettings';
import getUserProfile from '../../../modules/get-user-profile';

const AdminUserHeader = styled.h4`
  .label {
    position: relative;
    top: -2px;
    font-size: 10px;
  }

  .label-Facebook {
    background: var(--facebook);
    color: #fff;
  }

  .label-Google {
    background: var(--google);
    color: #fff;
  }

  .label-GitHub {
    background: var(--github);
    color: #fff;
  }
`;

const AdminUserTabs = styled(Tabs)`
  .nav.nav-tabs {
    margin-bottom: 20px;
  }
`;

const AdminUser = (props) => {
  const { loading, user } = props;
  return !loading && user ? (
    <div className="AdminUser">
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/admin/users">Users</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>{user && user.profile ? `${user.profile.name.first} ${user.profile.name.last}` : user.username}</Breadcrumb.Item>
      </Breadcrumb>
      <AdminUserHeader className="page-header">
        {user && user.profile ? `${user.profile.name.first} ${user.profile.name.last}` : user.username} {user.service !== 'password' ? <span className={`label label-${user.service}`}>{user.service}</span> : ''}
      </AdminUserHeader>
      <AdminUserTabs animation={false} defaultActiveKey={1} id="admin-user-tabs">
        <Tab eventKey={1} title="Profile">
          <AdminUserProfile {...props} />
        </Tab>
        <Tab eventKey={2} title="Settings">
          <UserSettings userId={user._id} />
        </Tab>
      </AdminUserTabs>
    </div>
  ) : <div />;
};

AdminUser.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default withTracker(({ match }) => {
  if (Meteor.isClient) {
    const userId = match.params._id;
    const subscription = Meteor.subscribe('admin.user', userId);

    return {
      loading: !subscription.ready(),
      roles: Roles.getAllRoles().map((role) => {
        role.inRole = Roles.userIsInRole(userId, role.name); // eslint-disable-line
        return role;
      }) || [],
      user: getUserProfile(Meteor.users.findOne({ _id: userId })) || {},
    };
  }

  return {};
})(AdminUser);
