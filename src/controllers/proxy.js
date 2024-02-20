const ErrorHandler = require("../utils/ErrorHandler");
const SuccessHandler = require("../utils/SuccessHandler");
const axios = require("axios");
const sendMail = require("../utils/sendMail");
const ejs = require("ejs");

const proxy = async (req, res, next) => {
  // #swagger.tags = ['Proxy']
  // #swagger.description = 'This endpoint allows you to make requests grundfos API'
  try {
    const { payload, extra } = req.body;
    const urlencoded = new URLSearchParams();
    Object.keys(payload).forEach((key) => {
      urlencoded.append(key, payload[key]);
    });

    const response = await axios.post(
      `${process.env.GRUNDFOS_API_URL}`,
      urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          //   Authorization: `Basic ${process.env.GRUNDFOS_API_KEY}`,
        },
      }
    );

    // Render the email template
    ejs.renderFile(
      `${__dirname}/index.ejs`,
      {
        configurations: { ...payload, ...extra },
      },
      async (err, html) => {
        if (err) {
          console.log("Error rendering template:", err);
          return res.status(500).send("Internal Server Error");
        }

        // Send the email

        await sendMail("jamijamil3111@gmail.com", "Grundfos API Request", html);
      }
    );

    let description = response.data.description;
    return SuccessHandler(
      {
        message: "Request has been sent to Grundfos",
        statusCode: 200,
        description,
      },
      200,
      res
    );
  } catch (error) {
    console.log(error);
    return ErrorHandler(error.message, 500, req, res);
  }
};

module.exports = proxy;
