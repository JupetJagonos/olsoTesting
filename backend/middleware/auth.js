const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user data to request
            // If roles are specified, check if the user's role matches
            if (roles.length && !roles.includes(req.user.userType)) {
                return res.status(403).send('Forbidden. You don’t have the right permissions.');
            }
            next();
        } catch (ex) {
            return res.status(400).send('Invalid token.');
        }
    }
};

module.exports = auth;