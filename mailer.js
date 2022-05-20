const nodemailer = require("nodemailer")

function enviar(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xxxx@gmail.com",
      pass: "xxxx",
    },
  })
  let mailOptions = {
    from: "xxxx@gmail.com",
    to,
    subject,
    text,
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err)
    if (data) console.log(data)
  })
}
module.exports = enviar
