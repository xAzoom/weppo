import Roles from "./ROLES";

const admin = (req, res, next) => {
    if (req.session.role === Roles.Admin) {
        next();
    } else {
        res.render('401', {role: req.session.role});
    }
};

export default admin;