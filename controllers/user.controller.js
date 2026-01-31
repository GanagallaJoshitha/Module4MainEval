import { supabase } from "../config/supabase.js";
export const register = async (req, res) => {
    const {name, email, password, role} = req.body;

    if(!name || !email || !password || !role)
        return res.status(400).json({error:"All fields required"});
    }

    if(! ["customer", "owner", "driver"].includes(role))
        return 
    res.status(400).json({error:"Invalid Role"});

    const {data: existing} = await supabase 
    .from("users")
    .select("*")
    .eq("email", email)

    if(existing.length > 0)
        return res.status(409).json({error:"Email already registered"});
    await supabase
    .from("users")
    .insert([{ name, email, password, role }]);
    res.status(201).json({message:"User registered"});