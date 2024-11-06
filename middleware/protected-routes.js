const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from Authorization header
  const token = req.header("Authorization");
  
  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Extract the token from the 'Bearer <token>' format
    const tokenWithoutBearer = token.split(" ")[1]; // Split to get the token part
    const verified = jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET);
    
    // Attach the decoded user data to the request
    req.user = verified;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Invalid token
    res.status(400).send('Invalid token');
  }
};
