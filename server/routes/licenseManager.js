'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(LicenseManager, app, auth, database) {

  app.get('/licenseManager/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/licenseManager/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/licenseManager/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/licenseManager/example/render', function(req, res, next) {
    LicenseManager.render('index', {
      package: 'license-manager'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
