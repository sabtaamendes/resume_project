import repositoryCandidates  from "../respositories/candidates.respository.js";

export async function getCandidates (req, res) {
    try {
        const result = await repositoryCandidates.get()
        console.log(result, 'result todos os candidatos')
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

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
    console.log(file, 'FILE PDF')

    try {
        if (!file){
            res.status(400).send('Arquivo não enviado');
            return;
        }
        const { originalname, buffer, mimetype } = req.file;

        await repositoryCandidates.post({fullname, email, phone, desired_position, originalname, buffer, mimetype});

        res.status(201).send('Usuário e arquivo PDF salvos com sucesso.');
            
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};
