const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "AttendanceSession",
    tableName: "attendance_sessions",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        unit_name: {
            type: "varchar"
        },
        qr_token: {
            type: "varchar",
            unique: true
        },
        qr_enabled: {
            type: "boolean",
            default: false
        },
        start_time: {
            type: "timestamp",
            nullable: true
        },
        end_time: {
            type: "timestamp",
            nullable: true
        }
    },
    relations: {
        lecturer: {
            type: "many-to-one",
            target: "User",
            joinColumn: true,
            inverseSide: "sessions",
            eager: true
        },
        attendanceRecords: {
            type: "one-to-many",
            target: "Attendance",
            inverseSide: "session"
        }
    }
});