import { Router } from "express";
import { validateCandidates } from "../middlewares/candidates.middleware.js";
import { postJobsCandidates, getCandidateById, getCandidates } from "../controllers/candidates.controller.js";
import multer from 'multer';

const router = Router();

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype !== 'application/pdf') {
//         return cb(new Error('Only PDFs are allowed'));
//     }
//     cb(null, true);
// };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // diretório onde os arquivos serão armazenados temporariamente
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // nome do arquivo original
    }
});

const upload = multer({ storage: storage });


router.post("/upload", upload.single('file'), validateCandidates, postJobsCandidates);
router.get("/candidate/:id", getCandidateById);
router.get("/download", getCandidates);

export default router;