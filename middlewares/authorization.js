const authorize = (request, response, next) =>
{
    if (req.user && req.user.role === 'admin')
        next();
    else
        res.status(403).json({ message: 'Forbidden: Unauthorized' });
};

module.exports = authorize;
