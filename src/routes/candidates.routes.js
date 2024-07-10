import { Router } from "express";
import { validateCandidates } from "../middlewares/candidates.middleware.js";
import { postJobsCandidates, getPdfByIdCandidate, getCandidates } from "../controllers/candidates.controller.js";
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });


router.post("/upload", upload.single('file'), validateCandidates, postJobsCandidates);
router.get("/candidate/:id", getPdfByIdCandidate);
router.get("/candidates", getCandidates);

export default router;