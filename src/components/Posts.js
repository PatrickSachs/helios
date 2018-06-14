import ReadOnlyPost from "./ReadOnlyPost";
import Card from "./Card";
import { FormattedMessage } from "react-intl";
import { EmoticonSadIcon } from "mdi-react";

export default ({ posts }) => (
  <section className="articles">
    {posts && posts.length !== 0
      ? posts.map(p => (<ReadOnlyPost key={p.id} {...p} />))
      : <Card><p className="subtitle"><EmoticonSadIcon className="mdi-icon-spacer" /> <FormattedMessage id="post.noneFound" /></p></Card>}
  </section>
);