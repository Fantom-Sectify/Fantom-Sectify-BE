import jwt from "jsonwebtoken";

const verifytoken = token => {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return false;
    }else{
      return decoded;
    }
  });
}
export default verifytoken;