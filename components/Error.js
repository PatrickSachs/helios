import { FormattedMessage } from "react-intl";
import Card from "./layout/Card";
import A from "./system/A";

export const FullError = ({ error }) => {
  return (<Card title={<p><FormattedMessage id="error" /></p>}>
    <SlimError error={error} />
  </Card>);
}

export const SlimError = ({ error }) => {
  error = error && error.response ? error.response.data : error;
  let str = null;
  if (error.name !== undefined) { str = byName(error); }
  if (!str) { str = byString(error); }
  if (str) { return str; }
  return (<div><code>{JSON.stringify(error)}</code></div>);
}

const byName = ({ name }) => {
  if (name === "NotLoggedInError") {
    return (<div>
      <FormattedMessage id="errorMessages.notLoggedIn" />
      <br/>
      <A href="/admin/account" class="button is-link"><FormattedMessage id="navigation.admin.signIn" /></A>
    </div>);
  }
}

const byString = string => {
  if ("string" === typeof string) {
    if (string.startsWith("missing-permission-")) {
      const permission = string.substring("missing-permission-".length);
      return (<FormattedMessage id="errorMessages.missingPermission" values={{
        permission: (<span className="tag">{permission}</span>)
      }} />);
    }
    if (string === "no-data") return (<FormattedMessage id="errorMessages.noData" />);
    if (string === "authorization-failure") return (<FormattedMessage id="errorMessages.authorizationFailure" />);
    if (string === "not-logged-in") return (<div>
      <FormattedMessage id="errorMessages.notLoggedIn" />
      <br/>
      <A href="/admin/account" class="button is-link"><FormattedMessage id="navigation.admin.signIn" /></A>
    </div>);
    if (string === "already-logged-in") return (<FormattedMessage id="errorMessages.notLoggedIn" />);
    if (string === "already-exists") return (<FormattedMessage id="errorMessages.alreadyExists" />);
  }
}