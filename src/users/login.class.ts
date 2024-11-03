import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
export class Login{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(5, 10)
    senha: string;
}