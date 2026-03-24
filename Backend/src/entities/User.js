

const { EntitySchema } = require("typeorm")

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar"
        }
    },
    relations: {
        role: {
            type: "many-to-one",
            target: "Role",
            joinColumn: true,
            eager: true
        },
        
            attendance: {
                type: "one-to-many",
                target: "Attendance",
                inverseSide: "user", // matches Attendance.user
        
        },
    }
})