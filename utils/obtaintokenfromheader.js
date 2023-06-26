const obtainTokenFromHeader = req => {
  const headersDetails = req.headers;
  const token = headersDetails['authorization'].split(" ")[1];
  if(token !== undefined) {
    return token;
}else{
    return {
        status: "error",
        message: "You are not authenticated"
    }
  }
}

// const obtainTokenFromHeader = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if(authHeader){
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if(err){
//                 return res.status(403).json(err);
//             }
//             req.user = user;
//             next();
//         });
//     }else{
//         return res.status(401).json("You are not authenticated");
//     }
// }

export default obtainTokenFromHeader;