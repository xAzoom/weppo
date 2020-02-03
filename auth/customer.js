import Roles from "./ROLES";

const customer = (req, res, next) => {
    if (req.session.role === Roles.Customer) {
        next();
    } else {
        res.render('401', );
    }
};

export default customer;