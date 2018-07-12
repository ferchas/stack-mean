const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

function Plugin() {
  // Setup the plugin instance with options...
  this.options = {};
}

Plugin.prototype.apply = function () {

};

const UglifyJS = extConfig => {
  if (extConfig.uglifyJs) {
    Plugin = new UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    });
  }

  return Plugin;
};

module.exports = UglifyJS;