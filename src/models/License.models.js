import { DataTypes } from "sequelize";
import { pool } from '../database.js';

//models for licenses go here

(async () => {
    try {
        await pool.sync();
    } catch (error) {
        console.log("Error creating tables.");
    }
    
})();