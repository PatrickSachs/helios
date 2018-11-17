import React from "react";
import { FormattedMessage, FormattedNumber, injectIntl } from "react-intl";
import Card from "../../components/layout/Card";
import config from "../../config/client";
import A from "../../components/system/A";
import { get } from "axios";

export default injectIntl(class Admin extends React.Component {
  static getInitialProps() {
    return Promise
      .all([get("/api/post-count"), get("/api/user-count")])
      .then(([post, user]) => ({
        postCount: post.data.count,
        userCount: user.data.count
      }));
  }

  componentDidMount() {
    const title = this.props.intl.formatMessage({ id: "admin.title" });
    this.props.setPageTitle(title);
  }

  render() {
    const { postCount, userCount } = this.props;
    return (
      <div className="container">
        <Card title={config.title} subtitle={config.description}>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading"><A href="/"><FormattedMessage id="admin.posts" /></A></p>
                <p className="title"><FormattedNumber value={postCount} /></p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading"><A href="/admin/users"><FormattedMessage id="admin.users" /></A></p>
                <p className="title"><FormattedNumber value={userCount} /></p>
              </div>
            </div>
          </nav>
        </Card>
      </div>);
  }
});
