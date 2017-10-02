require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-commonjs"]
});

require('./server.js')