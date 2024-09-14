// authorize.js
const jwt = require('jsonwebtoken');
module.exports = function authorize(roles = []) {
    // roles param can be a single role string or an array of roles
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return [
      // authenticate JWT token
      (req, res, next) => {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];
  
        if (!token) return res.sendStatus(401);
        console.log('i am here')
  
        jwt.verify(token, 'hello', (err, user) => {
        //   if (err) return res.sendStatus(403);
          console.log('i am here 2', user)
  
          req.user = user; // Save the user object from the token
            console.log(user);
  
          // Check if the user's role is allowed to access this route
          if (roles.length && !roles.includes(user.role)) {
            // User's role is not authorized
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
          }
  
          next();
        });
      }
    ];
  };
  