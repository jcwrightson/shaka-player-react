const express = require("express")
const graphqlHTTP = require("express-graphql")
const { buildSchema } = require("graphql")

function graphqlMiddleware() {
	const app = express()

	const schema = buildSchema(`
    type Movie {
      id: String!
      manifest: String
      name: String
    }

    type Query {
      movie(id: String): Movie
      movies: [Movie]
    }
  `)

	const movies = {
		"1": {
			id: "1",
			manifest:
				"https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
			name: "Star Trek"
		},
		"2": {
			id: "2",
			manifest:
				"https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd",
			name: "Sintel"
		},
		"3": {
			id: "3",
			manifest:
				"https://storage.googleapis.com/shaka-demo-assets/heliocentrism/heliocentrism.mpd",
			name: "Heliocentrism"
		}
	}

	const rootValue = {
		movie({ id }) {
			return movies[id]
		},
		movies() {
			return Object.values(movies)
		}
	}

	app.use(
		graphqlHTTP({
			schema,
			rootValue,
			graphiql: true
		})
	)

	return app
}

module.exports = exports = graphqlMiddleware
