const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const sendgridTransport = require("nodemailer-sendgrid-transport");
dotenv.config({ path: "./src/config/config.env" });
const { createTransport } = nodemailer;

const sendMail = async (email, subject, html) => {
  try {
    const transport = createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.NODEMAILER_API_KEY,
        },
      })
    );
    console.log(html);
    await transport.sendMail({
      from: "ah2k.dev@gmail.com",
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.log("Error sending mail:", error);
  }
};

module.exports = sendMail;
