import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import AdminUserProfile from '../../components/AdminUserProfile';
import UserSettings from '../../components/UserSettings';
import getUserProfile from '../../../modules/getUserProfile';
import Styles from './styles';

class AdminUser extends React.Component {
  state = { activeTab: 'profile' };

  render() {
    const { loading, user } = this.props;
    return !loading && user ? (
      <div className="AdminUser">
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/admin/users">Users</Link></Breadcrumb.Item>
          <Breadcrumb.Item active>{user && user.profile ? `${user.profile.name.first} ${user.profile.name.last}` : user.username}</Breadcrumb.Item>
        </Breadcrumb>
        <Styles.AdminUserHeader className="page-header">
          {user && user.profile ? `${user.profile.name.first} ${user.profile.name.last}` : user.username} {user.service !== 'password' && <span className={`label label-${user.service}`}>{user.service}</span>}
        </Styles.AdminUserHeader>
        <Styles.AdminUserTabs animation={false} activeKey={this.state.activeTab} onSelect={activeTab => this.setState({ activeTab })} id="admin-user-tabs">
          <Tab eventKey="profile" title="Profile">
            <AdminUserProfile {...this.props} />
          </Tab>
          <Tab eventKey="settings" title="Settings">
            { /* Manually check the activeTab value to ensure we refetch settings on re-render of UserSettings */ }
            {this.state.activeTab === 'settings' && <UserSettings isAdmin userId={user._id} />}
          </Tab>
        </Styles.AdminUserTabs>
      </div>
    ) : <div />;
  }
}

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
