import 'es6-shim/es6-shim';
import 'core-js/client/shim';
import 'core-js/es6';
import 'core-js/fn/object/entries';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'intl';
import 'intl/locale-data/jsonp/en';

if (process.env.APP_ENV === 'production') {
  // Production
} else {
  // Development
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
