import repositoryCandidates  from "../respositories/candidates.respository.js";
import fs from 'fs';


export async function getCandidates (req, res) {
    const result = await repositoryCandidates.getCandidates();
    res.send(result);
};



export async function getCandidateById (req, res) {
    const userId = req.params.id;

    try {
        const result = await repositoryCandidates.getCandidateById({userId});
        console.log(result, 'RESULT')
        if (!result || !result[0].pdf ) {
            return res.status(404).send({ error: 'PDF não encontrado para o candidato' });
        }

        const pdfBuffer = Buffer.from(result[0].pdf, 'base64');

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${result[0].filename}"`,
        });

        res.send( pdfBuffer);
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
