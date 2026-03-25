const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const AppDataSource =require("../config/data-source")

const userRepo= ()=> AppDataSource.getRepository("User")
const roleRepo = () => AppDataSource.getRepository("Role");

exports.register = async (data) => {
  const { name, email, password } = data;

  // check if user exists
  const existing = await userRepo().findOneBy({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔥 get default role (Student)
  const role = await roleRepo().findOneBy({ id: 2 });

  if (!role) {
    throw new Error("Default role not found");
  }

  // create user
  const user = userRepo().create({
    name,
    email,
    password: hashedPassword,
    role, // ✅ assign role object
  });

  const savedUser = await userRepo().save(user);

  return savedUser;
};

exports.login = async (data) =>{
    const {email,password}=data;
    const user= await userRepo().findOne({
        where:{email},
        relations:["role"],
    })

if(!user){
    throw new Error("User not Found")
}
//comapre password
const isMatch=await bcrypt.compare(password,user.password)

if(!isMatch){
    throw new Error("Invalid credentials");
}

//generate token
const token =jwt.sign(
    {
        id:user.id,
        role:user.role.role_name
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
return {user,token}
}