import Roles from "./ROLES";

const admin = (req, res, next) => {
    if (req.session.role === Roles.Admin) {
        next();
    } else {
        res.render('unauthorized');
    }
};

export default admin;