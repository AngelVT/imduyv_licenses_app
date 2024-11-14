import { Router } from "express";
import { test } from "../controllers/test.controller.js";
import jwt from 'jsonwebtoken';
import { error } from "console";

const router = Router();

router.get('/', test);

router.get('/verify/:token', async (req, res) => {
    try {
        const TOKEN = req.params.token;

        try {
            const DECODED = jwt.verify(TOKEN, process.env.SECRET_DOC);

            res.status(200).json(DECODED);
        } catch (error) {
            res.status(400).json({msg: "Documento Invalido"});
        }
        
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
});

export default router;