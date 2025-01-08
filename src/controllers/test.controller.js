import { __dirname, __dirstorage } from "../path.configuration.js";

export const test = async (req, res) => {
    try {
        res.status(200).json({msg: "Pong"});
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}

export const testFile = async (req, res) => {
    try {
        res.status(200).json({msg: "Pong"});
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}


export const testScript = async (req, res) => {
    try {
        res.status(200).json({msg: "Pong"});
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}