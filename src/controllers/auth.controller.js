import jwt from 'jsonwebtoken';
import config from "../config.js";
import { User, Group } from '../models/Users.models.js';
import * as passCrypt from '../libs/passwordCrypt.js';

import * as logger from '../libs/loggerFunctions.js';

export const signIn = async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            logger.logAccessWarning(`Access attempt with a no account details`, `User provided -> ${!username ? 'No' : username}
        Password Provided -> ${!password ? 'No' : 'Yes'}`);
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
            logger.logAccessWarning(`Access attempt with a not existent account`, `User provided -> "${username}"`);
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

            const token = jwt.sign({userID: user.id, username: user.username}, process.env.SECRET , {
                expiresIn: config.TOKENS_EXP
            });
            logger.logAccessInfo(`Access successful`,
                `Account ID -> ${user.id}
        Account -> ${user.username}`);
            res.cookie("access_token", token, {httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'strict',
                maxAge: config.TOKENS_EXP 
            }).status(200).redirect(redirection);
            return;
        }

        logger.logAccessWarning(`Access denied due to unable to authenticate account`,
                `Account ID -> ${user.id}
        Account -> ${user.username}`);
        
        res.status(401).json({
            msgType: "Access denied",
            msg: "Incorrect username or password"
        });
        return;
    } catch (error) {
        logger.logAccessError(`Unexpected access error`,
            error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const logOut = (req, res) => {
    res.cookie("access_token", {"id": "none"}, {httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict',
        maxAge: 1
    }).status(500).redirect('/app/login');
    return;
}