import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Email Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});

// Verify the transporter
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Function to read the Handlebars template file
const readHTMLFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    throw new Error("Error reading the template file");
  }
};

export const sendMail = async ({ to, subject, templateName, templateData }) => {
  // Read and compile the Handlebars template
  const templatePath = path.join(
    __dirname,

    "MailTemplates",
    `${templateName}.handlebars`,
  );
  console.log(`Template path: ${templatePath}`);
  const templateSource = readHTMLFile(templatePath);
  const template = handlebars.compile(templateSource);
  const htmlToSend = template(templateData);

  await transporter.sendMail({
    from: process.env.Email, // sender address
    to, // list of receivers
    subject, // Subject line
    html: htmlToSend,
  });
  console.log("Mail sent");
};
