const express = require("express")
const path = require("node:path")

const app = express()
app.use(express.static(path.join(__dirname, "/static")))
app.use(require("cors")())
app.use(require("body-parser").json())

const files = {
    "song": ["song1.html", "song2.html"]
}

app.get('/api/files/:namefile', (req, res) => {
    const {namefile} = req.params
    console.log(namefile)
    res.sendFile(path.join(__dirname, '/files/', namefile))
})

app.post('/', (req, res) => {
    const body = req.body
    const filesName = body.string
    if (filesName in files) {
        res.send(files[filesName])
    } else {
        res.send('Неверный запрос')
    }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.listen(3000)
