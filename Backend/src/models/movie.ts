import { DataTypes } from "sequelize";
import db from "../config/db";

const Movie = db.define("Movie", {
    title: {
        type: DataTypes.STRING
    },
    genders: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    directors: {
        type: DataTypes.TEXT('long')
    },
    actors: {
        type: DataTypes.TEXT('long')
    },
    state: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    createdAt: {
        defaultValue: db.literal('CURRENT_TIMESTAMP()'),
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        defaultValue: db.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'),
        allowNull: false,
        type: DataTypes.DATE
    }
});

export default Movie;

