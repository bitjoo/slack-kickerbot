const TOKEN = 'XDKtHO4TNNyLGct9kXc5VeQr';


module.exports = function (req, res, next) {
    if (req.query.token !== TOKEN) {
        res.send(403, 'Token.');
    } else {
        next();
    }
};
