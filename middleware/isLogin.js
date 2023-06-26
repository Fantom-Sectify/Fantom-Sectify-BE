import obtainTokenFromHeader from "../utils/obtaintokenfromheader.js";
import verifytoken from "../utils/verifytoken.js";

const isLogin = (req, res, next) => {

  const token = obtainTokenFromHeader(req);

  const userDecoded = verifytoken(token);
  req.userAuth = userDecoded.id;

  if (!userDecoded) {
    return res.json({
      status: "error",
      message: "You are not authenticated",
    });
  } else {
    next();
  }
}

export default isLogin;