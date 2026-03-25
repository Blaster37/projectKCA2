const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Role",
    tableName: "roles",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        role_name: {
            type: "varchar",
            unique: true
        }
    },
    relations: {
        users: {
            type: "one-to-many",
            target: "User",
            inverseSide: "role"
        }
    }
});