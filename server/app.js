const express = require("express")
const cors = require("cors")
const http = require("http")
const { defineAbility } = require("@casl/ability") 

// used to pack the rules/ability when we send it over the server
const { packRules } = require("@casl/ability/extra")

const app = express()

const httpServer = http.createServer(app)

// CORS 
app.use(cors())

app.get("/normal", (req, res) => {
    // define the ability of normal users
    const ability =  defineAbility((can) => {
        can("read", "Blog")
    })

    try {
        const packedRules = packRules(ability.rules)
        res.status(200).send(packedRules)
    } catch (err) {
        res.status(501).send(err.message)
    }
})

app.get("/admin", (req, res) => {
    // define the ability of normal users
    const ability =  defineAbility((can) => {
        can("manage", "all")
    })

    try {
        const packedRules = packRules(ability.rules)
        res.status(200).send(packedRules)
    } catch (err) {
        res.status(501).send(err.message)
    }
})

const PORT = process.env.PORT || 8000

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

httpServer.on("error", (err) => {
    console.log("Error opening server: ", err.message)
})