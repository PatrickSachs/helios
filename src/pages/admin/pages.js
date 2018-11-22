import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Card from "../../components/layout/Card";
import A from "../../components/system/A";
import { get } from "axios";
import Media from "../../components/layout/Media";

export default injectIntl(class PagesPage extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      pages: []
    }
  }

  componentDidMount() {
    const title = this.props.intl.formatMessage({ id: "page.manage.title" });
    this.props.setPageTitle(title);
    get("/api/page")
      .then(({ data }) => this.setState({ pages: data }))
      .catch(console.error);
  }

  render() {
    const { pages } = this.state;
    return (
      <div className="container">
        <Card
          title={(<FormattedMessage id="page.manage.title" />)}
          subtitle={(<span><A className="button" href="/admin/page"><FormattedMessage id="page.manage.newPage" /></A></span>)}>
          {pages.map(page => (<Media key={page._id} title={(<span>
            <strong style={{ marginRight: 2 }}><A href={`/admin/page/${page._id}`}>{page.title}</A></strong>
              {page.notes}
            </span>)}>
          </Media>))}
        </Card>
    </div>);
  }
});