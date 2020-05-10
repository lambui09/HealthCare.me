const { driver } = require('../config/database/neo4j');

const checkPatientInteracted = async (patient_id) => {
    const queryCypher = `
            MATCH (p: Patient { _id: $patient })-[r:INTERACTIVE]-(:Doctor)
            WITH COUNT(r) as hasInteracted
            RETURN hasInteracted
        `;
    const session = driver.session();
    try {
        const result = await session.run(queryCypher, {
            patient: patient_id,
        });
        const hasInteracted = result && result.records && result.records.length > 0 && result.records[0].get('hasInteracted');
        return !!hasInteracted;
    } catch (e) {
        return false;
    } finally {
        await session.close();
    }
};

const searchController = async (req, res) => {
    const { patient_id, symptom_list } = req.body;
    const session = driver.session();
    try {
        const hasInteracted = await checkPatientInteracted();

        const interactiveQueryBackup = `
            MATCH (p1:Patient { _id: $patient })-[r:INTERACTIVE]-(d:Doctor)
            WITH p1, AVG(r.score) AS p1_mean
            MATCH (p1)-[r1:INTERACTIVE]-(d:Doctor)-[r2:INTERACTIVE]-(p2:Patient)
            WITH p1, p1_mean, p2, COLLECT({r1: r1, r2: r2}) AS ratings WHERE size(ratings) > 0
            MATCH (p2)-[r:INTERACTIVE]-(d:Doctor)
            WITH p1, p1_mean, p2, avg(r.score) AS p2_mean, ratings
            UNWIND ratings AS r
            WITH SUM((r.r1.score - p1_mean) * (r.r2.score - p2_mean)) AS nom,
            SQRT( SUM( (r.r1.score - p1_mean)^2) * sum( (r.r2.score - p2_mean) ^2)) AS denom,
            p1, p2
            WHERE denom <> 0
            WITH p1, p2, nom/denom AS pearson_similarty
            WITH p1, p2, pearson_similarty
            ORDER BY pearson_similarty DESC
            LIMIT 15
            OPTIONAL MATCH (p2)-[r:INTERACTIVE]-(d:Doctor) WHERE NOT EXISTS( (p1)-[:INTERACTIVE]-(d) )
            RETURN d._id as _id, SUM( pearson_similarty * r.score) AS recommendation_score
            ORDER BY recommendation_score DESC
        `;

        const interactiveQuery = `
            MATCH (p1:Patient { _id: $patient })-[r:INTERACTIVE]-(d:Doctor)
            WITH p1, AVG(r.score) AS p1_mean
            MATCH (p1)-[r1:INTERACTIVE]-(d:Doctor)-[r2:INTERACTIVE]-(p2:Patient)
            WITH p1, p1_mean, p2, COLLECT({r1: r1, r2: r2}) AS ratings WHERE size(ratings) > 0
            MATCH (p2)-[r:INTERACTIVE]-(d:Doctor)
            WITH p1, p1_mean, p2, avg(r.score) AS p2_mean, ratings
            UNWIND ratings AS r
            WITH SUM((r.r1.score - p1_mean) * (r.r2.score - p2_mean)) AS nom,
            SQRT( SUM( (r.r1.score - p1_mean)^2) * sum( (r.r2.score - p2_mean) ^2)) AS denom,
            p1, p2
            WHERE denom <> 0
            WITH p1, p2, nom/denom AS pearson_similarty
            WITH p1, p2, pearson_similarty
            ORDER BY pearson_similarty DESC
            LIMIT 15
            OPTIONAL MATCH (p2)-[r:INTERACTIVE]-(d:Doctor) WHERE NOT EXISTS( (p1)-[:INTERACTIVE]-(d) )
            WITH d, SUM( pearson_similarty * r.score) AS similar_score
            UNWIND $symptom_list as symptom_id
            MATCH (symptom:Symptom)-[:IS_BOOKED_WITH]-(d) WHERE symptom._id = symptom_id
            MATCH (doctor:Doctor)-[r:IS_BOOKED_WITH]-(symptom)
            WITH sum(DISTINCT r.score) as symptom_score, similar_score, doctor
            RETURN DISTINCT doctor._id as _id, (similar_score + symptom_score) as recommendation_score
            ORDER BY recommendation_score DESC
        `;

        const notInteractiveQuery = `
            UNWIND $symptom_list as _id
            MATCH (symptom:Symptom) WHERE symptom._id = _id
            MATCH (doctor:Doctor)-[:IS_BOOKED_WITH]-(symptom)
            OPTIONAL MATCH (doctor)-[r1:INTERACTIVE]-(:Patient)
            WITH sum(DISTINCT r1.score) as recommendation_score, doctor    
            ORDER BY recommendation_score DESC
            RETURN doctor._id as _id, recommendation_score
        `;

        const queryCypher = hasInteracted ? interactiveQuery : notInteractiveQuery;

        const result = await session.run(queryCypher, {
            symptom_list: symptom_list,
            patient: patient_id
        });

        if (result && result.records && result.records.length) {
            return result.records;
        }
        return [];
    } catch (e) {
        return [];
    }
};

module.exports = {
    searchController,
}