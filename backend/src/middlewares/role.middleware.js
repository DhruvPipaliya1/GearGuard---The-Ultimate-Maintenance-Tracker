const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next({
        statusCode: 403,
        message: "Access denied"
      });
    }
    next();
  };
};

export default roleMiddleware;
