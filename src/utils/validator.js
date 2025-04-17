import { body, validationResult } from "express-validator";


export const validation = () => {
    return [
        body('email').isEmail().withMessage("It is not a valid email"),
        body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("Password is not valid. It should contain at least one uppercase letter, one lowercase letter, and one number."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            next();
        }
    ];
};

