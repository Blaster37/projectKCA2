require("reflect-metadata")
require("dotenv").config()

const express=require("express")
const cors=require("cors")
const AppDataSource=require("./config/data-source")
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes=require("./routes/attendanceRoutes")


//initialize Express app
const app=express()


//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//Routes
app.use("/api/auth",authRoutes)
app.use("/api/attendance",attendanceRoutes)

app.get("/",(req,res)=> {
    res.send("API is running 🚀")
});

// ✅ Initialize database THEN start server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to database:", error);
  });