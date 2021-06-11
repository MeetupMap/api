const helloResolve = {
    Query: {
        hello: () => {
            return {
                greeting: "yes",
                kind: 4
            }
        }
    }
}

module.exports = helloResolve;