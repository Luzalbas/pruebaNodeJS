import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define("user", 
    {
        name: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        email: {
            allowNull: false,
            type: DataTypes.TEXT
        }
    },   
    {
        freezeTableName: true,
        tableName: "user"
    }
);

export default User;