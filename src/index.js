import angular from 'angular';
import 'angular-smart-table';
import 'angular-ui-bootstrap';

import comLayout  from './layout';
import comUser  from './components/user';

angular.module('MyApp',['smart-table', 'ui.bootstrap'])
  .component('user', comUser)
  .component('layout', comLayout);