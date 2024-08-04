import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";



export const login=async(req,res)=>{
try{
  const {username,password}=req.body;
  const existing_user=await User.findOne({username});
  if(!existing_user){
    return res.status(401).json({
        msg:"user does not exists"
    })
  }
  const comparepass=await bcrypt.compare(password,existing_user.password);
  if(!comparepass){
    return res.status(401).json({
        msg:"incorrect password"
    })
  }
  const token= jwt.sign({userId:existing_user._id},'secret');
return res.cookie("token",token,{httpOnly:true}).status(200).json({
    msg:"user loged in",
    token,
    existing_user
})
 }catch(e){
      return res.status(404).json({
        msg:"internal server error"
      })
 }
}

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const existing_user = await User.findOne({ username });
        if (existing_user) {
            return res.status(400).json({
                msg: "Username already taken"
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const new_user = new User({
            username,
            password: hashedPassword
        });

        await new_user.save();

       
        const token = jwt.sign({ userId: new_user._id }, 'secret', { expiresIn: '1h' });

        return res.cookie("token", token, { httpOnly: true }).status(201).json({
            msg: "User registered successfully",
            token,
            new_user
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};


export const logout = (req, res) => {
   
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

    return res.status(200).json({
        msg: "User logged out successfully"
    });
};


export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
export const editprofile=async(req,res)=>{

}

export const followunfollow=async(req,res)=>{
try{
const df_userid=req.id;
const hf_userid=req.params.id;
const user=await User.findById(df_userid);
const targetUser=await User.findById(hf_userid);
if (!user || !targetUser) {
    return res.status(400).json({
        message: 'User not found',
        success: false
    });
}
const isfollowing=user.following.includes(hf_userid);

if(isfollowing){
//unfollow
await Promise.all(
    [
        User.updateOne({id:df_userid},{$pull:{following:hf_userid}}),
        User.updateOne({id:hf_userid},{$pull:{followers:df_userid}})
    ]
)
return res.status(200).json({ message: 'Unfollowed successfully', success: true });
}
//follow
await Promise.all(
    [
        User.updateOne({id:df_userid},{$push:{following:hf_userid}}),
        User.updateOne({id:hf_userid},{$push:{followers:df_userid}})
    ]
)
return res.status(200).json({message:"followed succesfuly"});
}catch(e){
    console.log(error)
}
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};