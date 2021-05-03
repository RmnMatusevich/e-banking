module.exports = (jwt, wrap, config, errors) =>
  wrap(async (req, res, next) => {
    if (req._parsedUrl.pathname.indexOf("auth") !== -1) {
      next();
    } else if (req.header("Authorization")) {
      let auth = req.header("Authorization").split(" ")[1];
      jwt.verify(auth, config.cookie.key, (err, decoded) => {
        if (err) {
          res.status(errors.forbidden.status).send(errors.forbidden);
        } else {
          console.log('REEEEQ ', decoded);
          
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(errors.unauthorized.status).send(errors.unauthorized);
    }
  });
