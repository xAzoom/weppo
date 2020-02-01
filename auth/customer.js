import Roles from "../roles";

const customer = (req, res, next) => {
    if (req.session.role === Roles.Customer) {
        next();
    } else {
        res.render('unauthorized');
    }
};

export default customer;