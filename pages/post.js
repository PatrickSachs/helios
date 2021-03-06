import Post from "../components/post/Post";
import React from "react"
import axios from "axios"
import Head from "next/head";
import Session from "../store/Session";
import crossuser from "../utils/crossuser";
import { permissions } from "../common/permissions";

export default class PostPage extends React.PureComponent {
  static async getInitialProps({ query, req }) {
    const { data } = await axios.get("/api/post/" + query.id, crossuser(req, { params: { readMore: true } }));
    return { post: data };
  }

  componentDidMount() {
    this.props.setPageTitle(this.props.post.title);
  }

  render() {
    const { post } = this.props;
    return (<>
      <Head>
        <link key="canonical" rel="canonical" href={`/post/${post._id}`} />
        <meta key="author" name="author" content={post.author} />
        <meta key="description" name="description" content={post.title} />
      </Head>
      <div className="container">
        <Session>
          {session => (<Post
            {...post}
            admin={session && session.hasPermission(permissions.post)}
            id={post._id}
            date={new Date(post.date)} />)}
        </Session>
      </div>
    </>);
  }
};