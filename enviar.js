const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "xxxx@gmail.com",
    pass: "xxxx",
  },
})

const enviar = async (to, subject, text) => {
  let mailOptions = {
    from: "xxxx@gmail.com",
    to: ["xxxx@gmail.com"].concat(to),
    subject,
    text,
  }
  try {
    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    throw error
  }
}
module.exports = enviar
