import { DataTypes } from "sequelize";
import { pool } from '../database.js';

(async () => {
    try {
        await pool.sync();
    } catch (error) {
        console.log("Error creating tables.");
    }
    
})();