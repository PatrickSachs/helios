import A from "./../system/A";
import Media from "../layout/Media";
import { FormattedMessage, FormattedDate } from "react-intl";

// todo: render to a shorter version, not the entire post!
const PostMedia = (post) => (<Media
  image={`/api/avatar/${post.author}`}
  title={(<FormattedMessage id="post.mediaTitle" values={{
    title: (<strong><A href={`/post/${post._id}`}>{post.title}</A></strong>),
    author: (<A href={`/about/${post.author}`}>{post.author}</A>),
    date: (new Date(post.date))
  }} />)}>
  <div dangerouslySetInnerHTML={{ __html: post.content }}/>
</Media>);

export default PostMedia;