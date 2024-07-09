import { Router } from "express";
import { validateCandidates } from "../middlewares/candidates.middleware.js";
import { postJobsCandidates, getCandidateById, getCandidates } from "../controllers/candidates.controller.js";
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDFs are allowed'));
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post("/upload", upload.single('file'), validateCandidates, postJobsCandidates);
router.get("/candidate/:id", getCandidateById);
router.get("/", getCandidates);

export default router;