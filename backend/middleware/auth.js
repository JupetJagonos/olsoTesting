const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach decoded user info for further use

            // Check if the user's role matches the expected roles
            if (roles.length && !roles.includes(req.user.userType)) {
                return res.status(403).json({ message: 'Access denied.' });
            }
            next(); // Proceed to the next middleware or route
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return res.status(401).json({ message: 'Token is not valid.' });
        }
    };
};

module.exports = auth; // Export the middleware
