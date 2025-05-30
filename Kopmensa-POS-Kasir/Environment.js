const baseAddress = "questil.com";
const apiUrl = `https://questil.com/EWasteDevAPI/api`;

const ENV = {
  dev: {
    apiUrl,
    appUrl: `exp://${baseAddress}:19000`,
    oAuthConfig: {
      issuer: apiUrl,
      clientId: "rsi_merchant",
      scope: "offline_access rsi_merchant",
    },
    localization: {
      defaultResourceName: "rsi_merchant",
    },
  },
  prod: {
    apiUrl,
    appUrl: `exp://${baseAddress}:19000`,
    oAuthConfig: {
      issuer: `http://${baseAddress}:44369`,
      clientId: "rsi_merchant",
      scope: "offline_access rsi_merchant",
    },
    localization: {
      defaultResourceName: "rsi_merchant",
    },
  },
};

export const getEnvVars = () => {
  return __DEV__ ? ENV.dev : ENV.prod;
};
