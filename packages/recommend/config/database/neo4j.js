const neo4j = require("neo4j-driver");

let driver;
try {
    driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
    console.log('Neo4j is running');
} catch (e) {
    console.log(e);
}

module.exports = {
    driver
};