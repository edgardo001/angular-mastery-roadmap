const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('../../package.json');

module.exports = {
  output: {
    uniqueName: 'remoteApp',
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteAppModule': './projects/remote-app/src/app/app.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: dependencies['@angular/core'] },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: dependencies['@angular/common'] },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: dependencies['@angular/router'] },
        rxjs: { singleton: true, strictVersion: true, requiredVersion: dependencies.rxjs },
      },
    }),
  ],
};
