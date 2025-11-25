import jwt from "jsonwebtoken";
import { SECRET } from '../configuration/environment.configuration.js';
import { findUserByIdUsername } from '../repositories/users.repository.js';

export async function verifySocketToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET);

        const { userID, username } = decoded;

        if (!userID || !username) return null;

        const USER = await findUserByIdUsername(userID, username);

        if (!USER) return null;

        return {
            id: USER.user_id,
            uuid: USER.public_user_id,
            name: USER.name,
            username: USER.username,
            role: USER.role.role,
            group: USER.group.group,
            permissions: USER.permissions.map(p => p.permission),
            isPasswordResetRequired: USER.requiredPasswordReset
        };
    } catch (err) {
        return null;
    }
}