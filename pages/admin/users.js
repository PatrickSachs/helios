import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Card from "../../components/layout/Card";
import A from "../../components/system/A";
import { get } from "axios";
import Media from "../../components/layout/Media";
import crossuser from "../../utils/crossuser";

export default injectIntl(class Admin extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      users: []
    }
  }

  static async getInitialProps({ req }) {
    const { data } = await get("/api/users", crossuser(req));
    return { users: data };
  }

  componentDidMount() {
    const title = this.props.intl.formatMessage({ id: "users.title" });
    this.props.setPageTitle(title);
  }

  render() {
    const { users } = this.props;
    return (
      <div className="container">
        <Card
          title={(<FormattedMessage id="users.title" />)}
          subtitle={(<span><A className="button" href="/admin/user"><FormattedMessage id="users.createUser" /></A></span>)}>
          {users.map(user => (<Media key={user.id} image={user.avatar || `/api/avatar/${user.id}`} title={(<span>
            <strong style={{ marginRight: 2 }}><A href={`/admin/user/${user.id}`}>{user.id}</A></strong>
              {user.permissions.map(p => (<span className="tag" style={{ marginRight: 2 }} key={p}>{p}</span>))}
            </span>)}>
            <div dangerouslySetInnerHTML={{ __html: user.bio }} />
          </Media>))}
        </Card>
    </div>);
  }
});
