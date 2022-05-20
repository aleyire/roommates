const http = require("http")
const fs = require("fs")
//const enviar = require("./mailer")
const url = require("url")
const { v4: uuidv4 } = require("uuid")
const getUser = require("./getUser")

http
  .createServer(async (req, res) => {
    //----------html
    console.log(req.url, req.method)
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

      //-------PUT
      if (req.url.startsWith("/gasto") && req.method == "PUT") {
        let body
        req.on("data", (payload) => {
          body = JSON.parse(payload)
        })
        req.on("end", () => {
          gastosJSON.gastos = gastos.map((g) => {
            if (g.id == body.id) {
              return body
            }
            return g
          })
          fs.writeFileSync("gastos.json", JSON.stringify(gastosJSON))
          res.end()
        })
      }

      //-------DELETE
      if (req.url.startsWith("/gasto") && req.method == "DELETE") {
        const { id } = url.parse(req.url, true).query
        gastosJSON.gastos = gastos.filter((g) => g.id !== id)
        fs.writeFileSync("roommates.json", JSON.stringify(gastosJSON))
        res.end()
      }
    }
  })
  .listen(3000, () => console.log("Server on"))
