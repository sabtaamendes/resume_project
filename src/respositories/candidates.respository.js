import connection from "../config/db.js";
async function get() {
    try {
        const result = await connection.query(
            `SELECT * FROM candidates;`
        );
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

async function getPdfByIdCandidate(data) {
    try {
        const result = await connection.query(
          `SELECT * FROM candidates JOIN resume ON candidates.id = resume.candidates_id WHERE candidates.id = $1;`,
          [data.userId]
        );

        if(result.rows.length === 0) {
            return { error: 'Candidato não encontrado.' };
        }
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

async function post(data) {
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
    getPdfByIdCandidate,
    post
}

export default repositoryCandidates;
