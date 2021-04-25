module.exports = (wrap, config, errors) =>
  wrap(async (req, res, next) => {
    if (!req.originalUrl.includes("/enrollments")) {
      next();
    } else if (req.method === "GET") {
      req.user.admin = req.user.id === config.userAdminId ? true : false;
      next();
    } else if (
      req.method !== "GET" &&
      req.originalUrl.includes("/enrollments") &&
      req.user.id === config.userAdminId
    ) {
      next();
    } else {
      res.status(errors.forbidden.status).send(errors.forbidden);
    }
  });
