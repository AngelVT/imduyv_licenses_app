import { User, Group, Role } from "../models/Users.models.js";
import * as logger from "../libs/loggerFunctions.js";
import { validateUserInfo } from '../libs/validate.js'
import * as passCrypt from '../libs/passwordCrypt.js';


export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include:[
                {
                    model: Role,
                    attributes: ['role']
                },
                {
                    model: Group,
                    attributes: ['group']
                }
            ]
        });

        if(users == null) {
            res.status(404).json({ msg: "The requested user does not exist or is unavailable" });
            return;
        }

        res.status(200).json({ data: users});

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> All records`);
    } catch (error) {
        logger.logConsoleError('User all records delete request failed due to server side error', error);
        logger.logRequestError('User all records delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.userID;

        const user = await User.findByPk(id, {
            include:[
                {
                    model: Role,
                    attributes: ['role']
                },
                {
                    model: Group,
                    attributes: ['group']
                }
            ]
        });

        if(user == null) {
            res.status(404).json({ msg: "The requested user does not exist or is unavailable" });
            return;
        }

        res.status(200).json({ data: user});

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> User: 
                    Name -> ${user.name}
                    Username -> ${user.username}`);
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createUser = async (req, res) => {
    try {
        const {name, username, password, role, group} = req.body;

        if (!name || !username || !password || !role || !group) {
            res.status(400).json({
                msgType: "Error",
                msg: "Required information for user creation was not provided"
            });
            return;
        }

        const cryptPassword = await passCrypt.encryptPassword(password);

        const [newUser, created] = await User.findOrCreate({
            where: { username },
                defaults: {
                    name,
                    username,
                    password: cryptPassword
                }
        });

        if (created) {
            await newUser.setRole(await Role.findByPk(role));
            await newUser.setGroup(await Group.findByPk(group));
        } else {
            res.status(200).json({
                msgType: "Not processed",
                msg: "The username is already in use please try a different one"
            });
            return;
        }

        const user = await User.findOne({
            where: {id: newUser.id},
            include: [
                {
                    model: Role,
                    attributes: ['role']
                },
                {
                    model: Group,
                    attributes: ['group']
                }
            ],
            attributes: ['name','username','createdAt']
        });

        res.status(201).json({
            msgType: "Successful",
            msg: "User successfully created",
            createdUser: user
        });
        
        logger.logRequestInfo('User create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Created -> User:
                    Name -> ${user.name}
                    Username -> ${user.username}`);
    } catch (error) {
        logger.logConsoleError('User record create request failed due to server side error', error);
        logger.logRequestError('User record create request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.userID;

        const {name, username, password, role, group} = req.body;

        const modifiedUser = await User.findByPk(id);

        consoleLogger.devInfo(modifiedUser);

        if(modifiedUser == null) {
            res.status(404).json({ msg: "The requested user does not exist or is unavailable" });
            return;
        }

        const validated = await validateUserInfo({username, role, group});

        if (validated == null) {
            res.status(400).json({ msg: "Invalid information provided or username already exists." });
            return;
        }

        if (password) {
            password = passCrypt.encryptPassword(password)
        }

        modifiedUser.update({
            name: name,
            username: username,
            password: password,
            roleId: role,
            groupId: group
        })

        res.status(200).json({ msg: "User updated successfully"});

        logger.logRequestInfo('User update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Updated -> User:
                    Name -> ${modifiedUser.name}
                    Username -> ${modifiedUser.username}`);
    } catch (error) {
        logger.logConsoleError('User record update request failed due to server side error', error);
        logger.logRequestError('User record update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.userID;

        const deletedUser = await User.findByPk(id);

        if(deletedUser == null) {
            res.status(404).json({ msg: "The requested user does not exist or is unavailable" });
            return;
        }

        deletedUser.destroy();

        res.status(200).json({msg: "Record deleted successfully"});

        logger.logRequestInfo('User update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Deleted -> User:
                    Name -> ${deletedUser.name}
                    Username -> ${deletedUser.username}`);
    } catch (error) {
        logger.logConsoleError('User record delete request failed due to server side error', error);
        logger.logRequestError('User record delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.userID, {
            attributes: ['name'],
            include: {
                model: Group,
                attributes: ['group']
            }
        });

        if (user === null) {
            res.status(404).json({msg: "No user found"});
            return;
        }

        res.status(200).json({
            name: user.name,
            group: user.group.group
        });
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}