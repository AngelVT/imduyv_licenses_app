import { Router } from "express";
import { test } from "../controllers/test.controller.js";

const router = Router();

router.get('/', test);

router.get('/verify', async (req, res) => {
    try {
        res.status(200).json({msg: "Pong"});
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
});

router.patch('/testBody', async (req, res) => {
    for (const key in req.body) {
        try {
            req.body[key] = JSON.parse(req.body[key])
        } catch (error) {
            console.log(error)
        }

        console.log('---', key, '-', typeof req.body[key]);
    }

    console.log(req.body);

    res.status(200).json(req.body);
});


export default router;