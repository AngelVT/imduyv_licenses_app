import { User , Role , Group} from "../models/Users.models.js";
import * as passCrypt from '../libs/passwordCrypt.js';
import jwt from 'jsonwebtoken';
import config from "../config.js";
import fs from 'fs/promises';
import { __dirname, __dirstorage } from "../paths.js";
import path from "path";


export const test = async (req, res) => {
    try {
        const destination = path.join(__dirstorage, req.file.originalname);

        await fs.writeFile(destination, req.file.buffer, err => {
            if (err) {
                console.log(err);
            }
        });

        const txt = await fs.readFile(path.join(__dirstorage, 'xd.txt'), 'utf8');

        res.status(200).json({msg: "Good", content: txt});
        /*const { username, password} = req.body;

        if (!username || !password) {
            res.status(400).json({
                msgType: "Error",
                msg: "Required information was not provided"
            });
            return;
        }
        
        const user = await User.findOne({
            where: { username },
            attributes: ['id','username','password'],
            include: {
                model: Group,
                attributes:['group']
            }
        });

        if(user == null) {
            res.status(401).json({
                msgType: "Access denied",
            msg: "Incorrect username or password"
            });
            return;
        }

        if (await passCrypt.comparePassword(password, user.password)) {
            let redirection;
            switch (user.group.group) {
                case 'all':
                    redirection = '/app/mainMenu'
                    break;
                case 'land_use':
                    redirection = '/app/landMenu'
                    break;
            
                case 'urban':
                    redirection = '/app/urbanMenu'
                    break;
                    
                default:
                    redirection = '/app/login'
                    break;
            }

            const token = jwt.sign({userID: user.id, username: user.username}, config.SECRET , {
                expiresIn: config.TOKENS_EXP
            });
            
            res.cookie("access_token", token, {httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'none',
                maxAge: config.TOKENS_EXP 
            }).status(200).json("access granted");
            return;
        }
        
        res.status(401).json({
            msgType: "Access denied",
            msg: "Incorrect username or password"
        });
        return;*/
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const testFile = async (req, res, next) => {
    try {
        const filePath = path.join(__dirstorage, 'dddepth-293.jpg');

        res.sendFile(filePath);
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
}