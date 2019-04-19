const express = require("express")
const cors = require("cors")
const graphqlMiddleware = require("./graphql")

const app = express()

app.use(cors())

app.use("/graphql", graphqlMiddleware())

if (require.main === module) {
	app.listen(3000, error => {
		if (error) return console.error(error)
		console.log("Running grapqhl server")
	})
}
