import repositoryCandidates  from "../respositories/candidates.respository.js";
import fs from 'fs';


export async function getCandidates (req, res) {
    
    try {
        const result = await repositoryCandidates.get();
        res.send(result);  
    } catch (error) {
        console.log(error)
    }
};

export async function getPdfByIdCandidate (req, res) {
    const userId = req.params.id;

    try {
        const result = await repositoryCandidates.getPdfByIdCandidate({userId});
        if (result.error) {
            return res.status(404).send(result.error);
        }

        const pdfBuffer = Buffer.from(result[0].pdf, 'base64');

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${result[0].filename}"`,
        });

        res.send( pdfBuffer);
    } catch (error) {

        res.status(500).send(error);
    }
};

export async function getPagination(req, res) {

   const { page = 1, limit = 10 } = req.query;
   try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const candidates = await repositoryCandidates.get();

    const results = candidates.slice(startIndex, endIndex);
  
    const totalCount = candidates.length;
  
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      results: results,
      page: page,
      totalPages: totalPages
    });
  
   } catch (error) {
       console.log(error)
   }
}

export async function postJobsCandidates(req, res) {
    console.log(req.body);
    const { fullname, email, phone, desired_position } = req.body;
    const file = req.file;

    try {
        if (!file){
            res.status(400).send('Arquivo não enviado');
            return;
        }

        const { originalname, path } = req.file;
        const pdf = fs.readFileSync(path);

        await repositoryCandidates.post({fullname, email, phone, desired_position, originalname, pdf});
        
        res.status(201).send('Usuário e arquivo PDF salvos com sucesso.');
            
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};
