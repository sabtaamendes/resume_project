import connection from "../config/db.js";
async function get() {
    try {
        const result = await connection.query(
            `SELECT * FROM candidates JOIN resume ON candidates.id = resume.candidates_id;`
        );
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

async function getCandidateById(id) {
    try {
        const result = await connection.query('SELECT * FROM candidates WHERE id = $1;', [id]);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

async function post(data) {
    console.log(data, "DATA POST")
    try {
        const insertUser = await connection.query(`
            INSERT INTO candidates (fullname, email, phone) VALUES ($1, $2, $3) RETURNING id;`,
            [data.fullname, data.email, data.phone]);

        const userId = insertUser.rows[0].id;

        await connection.query(`
            INSERT INTO resume (desired_position, filename, pdf, candidates_id) VALUES ($1, $2, $3, $4);`,
            [ data.desired_position, data.originalname, data.pdf, userId]
        );
    } catch (error) {
        console.log(error);
    }
}

const repositoryCandidates = {
    get,
    getCandidateById,
    post
}

export default repositoryCandidates;
