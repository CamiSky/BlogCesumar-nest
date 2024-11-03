import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

 export class UsersDTO{
    id: number;

    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(5, 10)
    password: string;

    @IsOptional()
    papel: string;

    created_at: Date;
}