const SuccessHandler = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");

const contact = async (req, res, next) => {
  // #swagger.tags = ['Contact']
  // #swagger.description = 'This endpoint allows you to send an email to the admin'
  try {
    const { fullName, email, message } = req.body;

    const html = `
        <h1>Contact Form</h1>
        <p>Full Name: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        `;

    // Send the email
    await sendMail("aptechzain1@gmail.com", `Contact Form`, html);

    return SuccessHandler(
      {
        message: "Email has been sent to the admin",
      },
      200,
      res
    );
  } catch (error) {
    console.log(error);
    return ErrorHandler(error.message, 500, req, res);
  }
};

module.exports = {
  contact,
};
