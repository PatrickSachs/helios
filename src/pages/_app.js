import App, { Container } from "next/app";
import Head from "next/head";
import Navbar from "./../components/Navbar";
import config from "../config/client";
import textContent from "react-addons-text-content";
import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
import { flattenObject } from "../fp"
import areIntlLocalesSupported from "intl-locales-supported";
import intl from "intl"; // todo: try to make this import lazy!
import Store from "../store";
import { get, post, put } from "axios";

const g = global || window;
// Load the locale data for NodeJS if it has not been installed.
if (g.Intl && !areIntlLocalesSupported([config.locale.meta.id])) {
  console.log("📡", "Polyfilling locale for client", config.locale.meta.id);
  Intl.NumberFormat = intl.NumberFormat;
  Intl.DateTimeFormat = intl.DateTimeFormat;
} else if (!g.Intl) {
  console.log("📡", "Polyfilling Intl for client");
  g.Intl = intl;
}
addLocaleData(config.locale.meta.intl);

const {
  meta: localeMeta,
  ...localeMessages
} = config.locale;

export default class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  constructor(p) {
    super(p);
    this.state = {
      session: undefined
    };
  }

  componentDidMount() {
    get("/api/session")
      .then(({ data }) => this.setState({ session: data }))
      .catch(() => this.setState({ session: undefined }));
  }

  signIn = ({ id, password }) => new Promise((res, rej) =>
    post("/api/session/login", { id, password })
      .then(({ data }) => this.setState({ session: data }, res))
      .catch(error => rej(error.response.data)));

  signOut = () => new Promise((res, rej) =>
    post("/api/session/logout")
      .then(() => this.setState({ session: undefined }, res))
      .catch(error => rej(error.response.data)));

  updateProfile = ({ password, passwordNew, avatar, bio }) => new Promise((res, rej) =>
    put("/api/session", { password, passwordNew, avatar, bio })
      .then(({ data }) => this.setState({ session: data }, res))
      .catch(error => rej(error.response.data)));

  setSession = (session) => {
    this.setState({ session });
  }

  hasPermission = (perm) => {
    const { session } = this.state;
    return session && (
      session.permissions.indexOf("admin") !== -1 ||
      session.permissions.indexOf(perm) !== -1)
  }

  actions = {
    setSession: this.setSession,
    signIn: this.signIn,
    signOut: this.signOut,
    updateProfile: this.updateProfile
  }

  render() {
    const { Component, pageProps } = this.props;
    const { session } = this.state;
    const title = this.component && this.component.getTitle && this.component.getTitle() || "…";
    return (<Container>
      <IntlProvider
        locale={localeMeta.id}
        messages={flattenObject(localeMessages)}>
        <Store.Provider value={{
          session,
          hasPermission: this.hasPermission,
          actions: this.actions
        }}>
          <Head>
            <title key="title">{title} | {config.title}</title>
          </Head>
          <Navbar
            title={(<span>{config.title} - {title}</span>)}
            logo="/static/content/system/logo.png">
            {[
              {
                title: (<FormattedMessage id="navigation.home" />),
                link: "/",
                key: "home"
              },
              session && {
                title: (<FormattedMessage id="navigation.admin.menu" />),
                link: "/admin",
                key: "admin",
                children: [
                  this.hasPermission("author") && {
                    title: (<FormattedMessage id="navigation.admin.newPost" />),
                    link: "/admin/post",
                    key: "post"
                  },
                  this.hasPermission("admin") && {
                    title: (<FormattedMessage id="navigation.admin.overview" />),
                    link: "/admin",
                    key: "overview"
                  },
                  {
                    title: (<FormattedMessage id="navigation.admin.account" />),
                    link: "/admin/account",
                    key: "account"
                  },
                  {
                    title: (<FormattedMessage id="navigation.admin.signOut" />),
                    link: "/admin/account",
                    onClick: this.signOut,
                    key: "signOut"
                  }
                ]
              },
              (!session && !config.hideLogInButton) && {
                title: (<FormattedMessage id="navigation.admin.signIn" />),
                link: "/admin/account",
                key: "signIn"
              }]}
          </Navbar>
          <div className="section">
            <Component {...pageProps} ref={component => this.component = component} />
          </div>
        </Store.Provider>
      </IntlProvider>
    </Container>);
  }
}