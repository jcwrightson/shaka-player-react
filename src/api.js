import fetch from "cross-fetch"

export const url = "http://localhost:3000/graphql"

/* eslint-disable-next-line no-shadow */
export const doFetch = async (url, query, variables) => {
	const results = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query,
			variables
		})
	})

	return results.json() || { error: results.error }
}
