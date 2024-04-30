import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password, cryptPassword) => {
    return await bcrypt.compare(password , cryptPassword);
}
