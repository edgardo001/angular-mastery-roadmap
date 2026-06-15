import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export const authConfig: OpenIdConfiguration = {
  authority: 'https://placeholder-identity.example.com',
  clientId: 'angular-demo-client',
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  scope: 'openid profile email offline_access',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
};
