const { body, validationResult } = require("express-validator");

const validateInfo = [
  body("fullName")
    .isLength({ min: 3 })
    .withMessage("Full name must be atleast 3 characters long.")
    .notEmpty()
    .withMessage("Full name field is required."),
  body("email")
    .isEmail()
    .withMessage("Please enter valid email address")
    .notEmpty()
    .withMessage("Email field is required."),
  body("age")
    .isInt({ min: 18 })
    .withMessage("Age should be greater than or equal to 18.")
    .notEmpty()
    .withMessage("Age field is required"),
  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other.")
    .notEmpty()
    .withMessage("Gender field is required."),
  body("address")
    .isLength({ min: 10 })
    .withMessage("Address must be atleast 10 characters long.")
    .notEmpty()
    .withMessage("Address field is required."),

  // Middleware to check error for validation request
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = { validateInfo };
