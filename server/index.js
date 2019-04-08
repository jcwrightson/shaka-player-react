const express = require("express")
const graphqlMiddleware = require("./graphql")

const app = express()

app.options("/graphql", (req, res) => {
	res.setHeader("access-control-allow-origin", "*")
	res.setHeader("access-control-allow-headers", "*")
	res.sendStatus(200)
})

app.use("/graphql", graphqlMiddleware())

if (require.main === module) {
	app.listen(3000, error => {
		if (error) return console.error(error)
		console.log("Running grapqhl server")
	})
}
