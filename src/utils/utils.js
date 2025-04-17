import bcrypt from "bcryptjs"
export const passwordSalt = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt)
}


export const isValidPassword = (pass,hash)=>{     
    return bcrypt.compareSync(pass,hash);
}