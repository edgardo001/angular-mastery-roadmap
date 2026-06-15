const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('../../package.json');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:4201/remoteEntry.js',
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
