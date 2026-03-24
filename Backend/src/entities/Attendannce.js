const {EntitySchema} =require("typeorm")

module.exports =new EntitySchema({
    name:"Attendance",
    tableName:"attendance",
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        date:{
            type:"date"
        },
        unit_name:{
            type:"varchar"
        },
        admission_no:{
            type:"varchar"
        }
    },
  relations: {
  user: {               
    type: "many-to-one",
    target: "User",
    joinColumn: true,   
    inverseSide: "attendance", 
    eager: true,
  },
},
})