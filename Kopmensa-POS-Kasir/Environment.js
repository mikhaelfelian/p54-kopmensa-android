const baseAddress = "dev.kopmensa.com";
const apiUrl = `https://${baseAddress}`;

const ENV = {
  dev: {
    apiUrl,
    appUrl: `exp://${baseAddress}:19000`,
    oAuthConfig: {
      issuer: apiUrl,
      clientId: "rsi_cashier",
      scope: "offline_access rsi_cashier",
    },
    localization: {
      defaultResourceName: "rsi_cashier",
    },
  },
  prod: {
    apiUrl,
    appUrl: `exp://${baseAddress}:19000`,
    oAuthConfig: {
      issuer: `http://${baseAddress}:44369`,
      clientId: "rsi_cashier",
      scope: "offline_access rsi_cashier",
    },
    localization: {
      defaultResourceName: "rsi_cashier",
    },
  },
};

export const getEnvVars = () => {
  return __DEV__ ? ENV.dev : ENV.prod;
};
