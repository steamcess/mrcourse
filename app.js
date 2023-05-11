const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const router = require("./routes/index")
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(router)

app.listen(port, () => {
  console.log(`Berhasil berjalan di port ${port}`)
})
