import { password } from "bun";
import {z} from "zod";

// -----------SIGNUP SCHEMA ---------//
export const signupSchema = z.object({
    username:z.string().min(3,"Username must be at least 3 characters").max(20,"Username must be 20 characters").regex(/^[a-zA-Z0-9]+$/,"Username can contain letters,numbers and underscores only"),
    password:z.string().min(6,"Password must be at least 6 characters").max(50,"Password is to long")
});


//----------SIGNIN SCHEMA-------//

export const signinSchema = z.object({
    username:z.string(),
    password:z.string()
});

//-----EXPORT TYPES FOR TYPESCRIPT-----//

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInpurt = z.infer<typeof signinSchema>;