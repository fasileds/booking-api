import jsonwebtoken from "jsonwebtoken";
export const verifay = (req, res, next) => {
  const token = req.cookies.accsess_token;
  if (!token) {
    return res.status(500).json("there is an error that is whatis the matter");
  }

  jsonwebtoken.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }
    req.user = user;
    next();
  });
};
export const verifayUser = (req, res, next) => {
  verifay(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(500).json("there you cant delete any user");
    }
  });
};
export const verifayAdmin = (req, res, next) => {
  verifay(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(500).json("there you cant delete any user");
    }
  });
};
