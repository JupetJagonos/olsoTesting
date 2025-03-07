const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    // Convert roles to an array if it's a string
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // Get token from headers
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // If no token is provided
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied.' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach decoded user info for further use

            // Check user roles
            if (roles.length && !roles.includes(req.user.userType)) {
                return res.status(403).json({ message: 'Access denied.' });
            }

            next(); // Proceed to the next middleware or route
        } catch (error) {
            // Log the error for debugging
            console.error('JWT Verification Error:', error);
            return res.status(401).json({ message: 'Token is not valid.' });
        }
    };
};

module.exports = auth; // Export the middleware