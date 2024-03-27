import EmberRouter from '@ember/routing/router';
import config from 'electoral-bonds-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('party-data', function () {});
  this.route('company-data', function () {});
  this.route('details');
});
