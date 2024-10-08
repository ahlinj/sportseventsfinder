const express = require('express')
const dotenv = require('dotenv')
const cors=require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()
dotenv.config()

const port = 5000
const users = require("./routes/users.js")
const organizations = require("./routes/organizations.js")
const events = require("./routes/events.js")
const tokens = require("./routes/tokens.js")
const prizes = require("./routes/prizes.js")

app.use(express.static(path.join(__dirname, "build")))
app.use(cookieParser("somesecrets"))
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors({
  methods:["GET", "POST"],
  origin: 'http://localhost:3000', 
  credentials: true 
}))



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")) 
})


app.use("/users",users)
app.use("/organizations",organizations)
app.use("/events",events)
app.use("/tokens",tokens)
app.use("/prizes",prizes)

///App listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})
