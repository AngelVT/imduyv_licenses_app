import { User, Group, Role } from "../models/Users.models.js";
import * as passCrypt from '../libs/passwordCrypt.js';


export const getUsers = async (req, res) => {
    res.status(200).json({ msg: "Getting all"});
}

export const getUser = async (req, res) => {
    res.status(200).json({ msg: "Getting single"});
}

export const createUser =async (req, res) => {
    try {
        const {name, username, password, role, group} = req.body;

        if (!name || !username || !password || !role || !group) {
            res.status(400).json({
                msgType: "Error",
                msg: "Required information was not provided"
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
                msg: "The user already exist please try a different one"
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
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const updateUser = async (req, res) => {
    res.status(200).json({ msg: "Updating"});
}

export const deleteUser = async (req, res) => {
    res.status(200).json({ msg: "Deleting"});
}

export const getUserName = async (req, res) => {
    try {
        const user = await User.findByPk(req.userID, {
            attributes: ['name']
        });

        if (user === null) {
            res.status(404).json({msg: "No user found"});
            return;
        }

        res.status(200).json({
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}