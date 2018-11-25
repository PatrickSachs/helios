import Columns from "../../components/layout/Columns";
import A from "../../components/system/A";
import React from "react";
import Card from "../../components/layout/Card"
import EditablePost from "../../components/post/PostEditor";
import axios from "axios";
import NotificationStore from "../../store/Notification";
import withStores from "../../store/withStores";
import { FormattedMessage, injectIntl } from "react-intl";
import config from "../../config/client";
import DeleteIcon from "mdi-react/DeleteIcon";
import TrashIcon from "mdi-react/TrashIcon";
import LoadingIcon from "mdi-react/LoadingIcon";
import CakeIcon from "mdi-react/CakeIcon";
import { FullError } from "../../components/Error";
import PostForm from "../../components/forms/PostForm";
import crossuser from "../../utils/crossuser";

export default withStores(NotificationStore, injectIntl(class PostPage extends React.PureComponent {
  constructor(p) {
    super(p);
    this.state = {
      ...defaultPostData(),
      ...p.data
    };
  }

  static async getInitialProps({ query, req }) {
    const opts = crossuser(req);
    const { data: tags } = await axios.get("/api/tag", opts);
    if (query.id) {
      const { data } = await axios.get(`/api/post/${id}`, opts);
      return { data };
    } else {
      const { data } = await axios.get("/api/session", opts);
      return {
        tags, data: {
          author: data.id
        }
      };
    }
  }

  componentDidMount() {
    let title = "";
    const { state } = this.state;
    switch (state) {
      case "loaded": {
        title = isNew
          ? this.props.intl.formatMessage({ id: "post.title.new" }, { title })
          : this.props.intl.formatMessage({ id: "post.title.edit" }, { title })
        break;
      }
      case "loading": {
        title = this.props.intl.formatMessage({ id: "loading" });
        break;
      }
      case "error": {
        title = this.props.intl.formatMessage({ id: "error" });
        break;
      }
    }
    this.props.setPageTitle(title);
  }

  onChange = what => (value) => {
    this.setState({ [what]: value });
  }

  onDelete = (really) => () => {
    if (really) {
      const { id } = this.state;
      axios.delete(`/api/post/${id}`).then(() => {
        this.setState({
          id: undefined,
          isNew: true,
          date: new Date()
        }, () => {
          this.props.notificationStore.push({
            type: "success",
            icon: DeleteIcon,
            title: (<FormattedMessage id="post.editor.notification.deleted.title" />),
            children: (<FormattedMessage id="post.editor.notification.deleted.description" />)
          });
        });
      }).catch(error => this.props.notificationStore.pushError(error));
    } else {
      this.props.notificationStore.push({
        type: "danger",
        icon: TrashIcon,
        title: (<FormattedMessage id="post.editor.notification.delete.title" />),
        children: (<FormattedMessage id="post.editor.notification.delete.description" />),
        buttons: [
          {
            text: (<FormattedMessage id="post.editor.notification.delete.confirm" />),
            action: this.onDelete(true)
          }
        ]
      });
    }
  }

  onPublish = ({ tags, notes }) => {
    const { id, title, content, date, author, isNew } = this.state;
    const data = {
      author, date, tags, notes,
      title: title,
      content: content
    };
    const promise = isNew ? axios.post("/api/post", data) : axios.put(`/api/post/${id}`, data);
    promise
      .then(({ data }) => this.setState(this.stateFromData(data, this.state), () => {
        this.props.notificationStore.push({
          type: "success",
          icon: CakeIcon,
          title: (<FormattedMessage id="post.editor.notification.published.title" values={{
            link: (<A href={`/post/${data._id}`}>{data.title}</A>)
          }} />),
          children: (<FormattedMessage id="post.editor.notification.published.description" values={{
            link: (<A href={`/post/${data._id}`}>{data.title}</A>)
          }} />)
        });
      }))
      .catch(error => this.props.notificationStore.pushError(error));
  }

  renderDeleteSuccessNotification() {
    return (<div>
      <p className="subtitle">
        <DeleteIcon className="mdi-icon-spacer" />
        <FormattedMessage id="post.editor.notification.deleted.title" />
      </p>
      <p>
        <FormattedMessage id="post.editor.notification.deleted.description" />
      </p>
    </div>);
  }

  render() {
    const { _id, title, content, date, author, tags, notes } = this.state;
    return (
      <div className="container">
        <Columns size={3} sidebar={(
          <div className="sidebar">
            <Card>
              <PostForm
                tags={tags}
                notes={notes}
                allTags={this.state.allTags}
                onPublish={this.onPublish}
                onDelete={_id ? this.onDelete(false) : undefined}
              />
            </Card>
          </div>)}>
          <EditablePost
            author={author}
            avatar={`/api/avatar/${author}`}
            content={content}
            date={date}
            title={title}
            onChange={this.onChange}
          />
        </Columns>
      </div>
    );
  }
}));

const defaultPostData = () => ({
  tags: config.defaultTags,
  title: config.locale.post.defaults.title,
  content: config.locale.post.defaults.description
});
