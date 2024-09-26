import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

interface Props {
  children: React.ReactNode;
}

const ErrorMonitor = ({ children }: Props) => {
  // @ts-ignore
  if (!Bugsnag._client) {
    Bugsnag.start({
      apiKey: process.env.NEXT_PUBLIC_BUGSNAG_KEY || "",
      plugins: [new BugsnagPluginReact()],
      enabledReleaseStages: ["production", "preview"],
    });
  }

  const ErrorBoundary = Bugsnag?.getPlugin("react")?.createErrorBoundary(React);

  if (ErrorBoundary) {
    // @ts-ignore
    return <ErrorBoundary>{children}</ErrorBoundary>;
  } else return <>{children}</>;
};

export default ErrorMonitor;
