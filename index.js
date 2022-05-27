const http = require("http")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const enviar = require("./enviar")
const getUser = require("./getUser")
const enviar = require("./enviar")

http
  .createServer(async (req, res) => {
    //----------html
    if (req.url === "/" && req.method === "GET") {
      fs.readFile("./index.html", (err, html) => {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(html)
      })
    }
    //----------almacenar nuevo roommate
    if (req.url.startsWith("/roommates") && req.method == "GET") {
      //roommates/GET
      let roommatesJSON = JSON.parse(
        fs.readFileSync("./roommates.json", "utf8")
      )
      res.end(JSON.stringify(roommatesJSON))
    }

    if (req.url.startsWith("/gastos") && req.method == "GET") {
      //gastos/GET
      res.end(JSON.stringify([]))
    }

    if (req.url.startsWith("/roommate") && req.method === "POST") {
      //roommates/POST
      try {
        let roommatesJSON = JSON.parse(
          fs.readFileSync("./roommates.json", "utf8")
        )
        let roommates = roommatesJSON.roommates
        let nombre
        let apellido

        const newUser = await getUser()
        console.log(newUser)
        nombre = newUser[0].name.first
        apellido = newUser[0].name.last

        const roommate = {
          id: uuidv4(),
          nombre: nombre + " " + apellido,
          debe: "",
          recibe: "",
        }
        roommates.push(roommate)

        fs.writeFileSync("roommates.json", JSON.stringify(roommatesJSON))
        res.end()
      } catch (error) {
        ;(res.statusCode = 500), res.end(), console.log(error)
      }
    }
    enviar(to, subject, text)
      .then(() => {
        res.end(JSON.stringify(to))
      })
      .catch((error) => {
        res.statusCode = 500
        res.end()
        console.log("error en el envio del correo", error)
      })
    res.end(JSON.stringify(to))
  })
  .listen(3000, () => console.log("Server on"))
