const express =require("express")
const router= express.Router()
const attendanceController =require("../controllers/attendanceController")


router.post("/",attendanceController.postAttendance)
router.get("/students",attendanceController.getAllAttendance)
router.get("/:id",attendanceController.getStudentAttendance)


module.exports=router;