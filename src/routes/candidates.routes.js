import { Router } from "express";
import {postJobsCandidates, getCandidateById, getCandidates} from "../controllers/candidates.controller.js";
import multer from 'multer';

const router = Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single('file'), postJobsCandidates);
router.get("/candidate/:id", getCandidateById);
router.get("/", getCandidates);

export default router;