import Head from "next/head";
import Navbar from "./Navbar";
import style from "../../styles/style.sass";

export default (({ title, children }) => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title key="title">{title} | Patrick Sachs</title>
      <style dangerouslySetInnerHTML={{ __html: style }} />
    </Head>
    <Navbar
      title={"Patrick Sachs - " + title}
      logo="/static/content/system/logo.png"
      links={[{
        title: "Home",
        link: "/"
      }, {
        title: "Projects",
        link: "/projects"
      }, {
        title: "Admin",
        link: "/admin",
        children: [{
          title: "New Post",
          link: "/admin/post"
        }, {
          title: "Account",
          link: "/admin/account"
        }]
      }]} />
    <div className="container">
      {children}
    </div>
  </div>
));