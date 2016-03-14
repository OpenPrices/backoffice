'use strict';

angular.module('backofficeApp.auth', [
  'backofficeApp.constants',
  'backofficeApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
