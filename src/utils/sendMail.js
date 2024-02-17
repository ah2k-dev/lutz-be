const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const sendgridTransport = require("nodemailer-sendgrid-transport");
dotenv.config({ path: "./src/config/config.env" });
const { createTransport } = nodemailer;

const sendMail = async (email, subject, html) => {
  const transport = createTransport(
    sendgridTransport({
      auth: {
        api_key: "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",
      },
    })
  );
  await transport.sendMail({
    from: "insightmeter@gmail.com",
    to: email,
    subject,
    html,
  });
};

module.exports = sendMail;
