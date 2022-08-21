const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
  try {
    const nodemailerConfig = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "tanyalegois@meta.ua",
        pass: META_PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(nodemailerConfig);
    const email = { ...data, from: "tanyalegois@meta.ua" };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};


/* const sgMail = require("@sendgrid/mail");

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = {...data, from: "bogdan.lyamzin.d@gmail.com"};
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
} */
 

module.exports = sendEmail;
