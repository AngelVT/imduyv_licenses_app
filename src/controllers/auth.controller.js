import jwt from 'jsonwebtoken';
import config from "../config.js";
import { User, Group } from '../models/Users.models.js';
import * as passCrypt from '../libs/passwordCrypt.js';

import { accessLogger } from '../logger.js';

export const signIn = async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            accessLogger.attempt('Failed access due to no password or username');
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
            accessLogger.attempt('Failed access due to user account "%s" does not exist', username);
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
            accessLogger.access('Access successful\n    ID: %d\n    User account: "%s"', user.id, user.username);
            res.cookie("access_token", token, {httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'strict',
                maxAge: config.TOKENS_EXP 
            }).status(200).redirect(redirection);
            return;
        }

        accessLogger.attempt('Failed access due to incorrect password or unable to authenticate for:\n    User account: "%s"',username);
        
        res.status(401).json({
            msgType: "Access denied",
            msg: "Incorrect username or password"
        });
        return;
    } catch (error) {
        console.log(error);
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