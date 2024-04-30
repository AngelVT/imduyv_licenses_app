import jwt from 'jsonwebtoken';
import config from '../config.js';

export const verifyToken = async (req, res, next) => {
    console.log("Verifying token");
    next();
}

export const isModerator = async (req, res, next) => {
    console.log("Verifying Moderator Role");
    next();
}

export const isAdmin = async (req, res, next) => {
    console.log("Verifying Admin role");
    next();
}

export const isLandUser = async (req, res, next) => {
    console.log("Verifying Land user group");
    next();
}

export const isUrbanUser = async (req, res, next) => {
    console.log("Verifying Urban user group");
    next();
}