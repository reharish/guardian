var Session = require('../model/session');
var Cookie = require('./cookie');

exports.attach = function(app) {
  Session.connect();
  Cookie.attach(app);

  app.use(function(req, res, next) {
    var cookie = Config.get('session:cookie');

    Session.find(req.cookie(cookie.name), function(err, session) {
      if (err) return next(err);
      req.log('session.fetch', {
        id: session.id,
        state: session.state,
      });

      res.logout = function(callback) {
        this.rmCookie(cookie.name, cookie.options);
        session.destroy(callback);
      };

      req.session = res.session = session.data;
      req._session = res._session = session;
      if (res.locals) res.locals.session = session.data;

      res.cookie(cookie.name, session.id, cookie.options);

      res.before('headers', function(done) {
        if (!session.changed()) {
          res.log('session.unchanged');
          return done();
        }

        res.log('session.save');
        session.save(function(err) {
          res.log('session.saved', err || {
            success: true,
            state: session.state,
          });
          done();
        });
      });

      next();
    });
  });
};
