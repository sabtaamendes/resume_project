import repositoryCandidates  from "../respositories/candidates.respository.js";
import fs from 'fs';

export async function getCandidates(req, res) {
    try {
        const results = await repositoryCandidates.get(); // Supondo que repositoryCandidates.get() retorna os candidatos

        if (!Array.isArray(results) || results.length === 0) {
            return res.status(404).send({ error: 'Nenhum candidato encontrado' });
        }

        results.forEach(candidate => {
            const fileBuffer = Buffer.from(candidate.pdf, 'base64'); // Converte o base64 para Buffer
            res.write(fileBuffer); // Escreve o conteúdo do arquivo na resposta
        });

        res.end(); // Finaliza a resposta após enviar todos os arquivos

    } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        res.status(500).send({ error: 'Erro ao buscar candidatos' });
    }
}

export async function getCandidateById (req, res) {
    const userId = req.params.id;

    try {
        const result = await repositoryCandidates.getCandidateById(userId);

        res.send(result);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(404).send('Erro ao obter usuário');
    }
};

export async function postJobsCandidates(req, res) {
    console.log(req.body);
    const { fullname, email, phone, desired_position } = req.body;
    const file = req.file;
    console.log(file, 'FILE PDF'); 


    try {
        if (!file){
            res.status(400).send('Arquivo não enviado');
            return;
        }
        // const { originalname, buffer, mimetype } = req.file;

        // await repositoryCandidates.post({fullname, email, phone, desired_position, originalname, buffer, mimetype});
        const { originalname, path } = req.file;
        console.log(req.file.path, 'PATH PDF');
        const pdf = fs.readFileSync(path);
        console.log(pdf, 'ARQUIVO PDF');
        await repositoryCandidates.post({fullname, email, phone, desired_position, originalname, pdf});
        
        res.status(201).send('Usuário e arquivo PDF salvos com sucesso.');
            
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};
