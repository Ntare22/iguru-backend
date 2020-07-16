import { body, validationResult } from 'express-validator';
import Models from '../database/models';

const { Users } = Models;
const checkFirstName = [
  body('firstName')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Please provide a first name')
    .bail()
    .isAlpha()
    .withMessage("Please don't use digits in your first name"),
];
const checkLastName = [
  body('lastName')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Please provide a last name')
    .bail()
    .isAlpha()
    .withMessage("Please don't use digits in your last name"),
];

const checkName = [
  body('name')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Please provide a name'),
];

const checkDescription = [
  body('description')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Please provide a description')
    .isLength({ min: 10 })
    .withMessage('Your description is short'),
];

const checkValidImageUrl = [
  body('imageUrl')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Please provide a company display picture')
    .bail()
    .isURL()
    .withMessage('Please provide a valid url to the display picture'),
];

const checkValidEmail = [
  body('email')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Please provide an email')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email'),
];
const checkExistingEmail = [
  body('email', 'This email have been taken').custom((value = '') =>
    Users.findOne({
      where: {
        email: value,
      },
    }).then((user) => {
      if (user !== null) {
        return Promise.reject();
      }
      return true;
    })
  ),
];

const checkPassword = [
  body('password')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.'
    ),
];

const validateResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const { errors } = result;

  const errorMessageArr = errors.map((el) => el.msg);

  if (errorMessageArr.includes('This email have been taken')) {
    return res.status(409).json({
      status: 409,
      error: 'This email have been taken',
    });
  }

  return res.status(422).json({
    status: 422,
    error: errorMessageArr,
  });
};

export default {
  checkFirstName,
  checkLastName,
  checkValidImageUrl,
  checkDescription,
  checkName,
  checkValidEmail,
  checkExistingEmail,
  checkPassword,
  validateResult,
};
