import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";  
import { InjectRepository } from "@nestjs/typeorm";
import { UsersDTO } from "./DTO/users.dto";

@Controller("users")
export class IndexController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>  
    ) {}

    @Get()
    async getUsersList() {
        return await this.usersRepository.find();
    }

    @Get(":id")
    async getUserById(@Param("id") id: number) {  
        const user = await this.usersRepository.findOneBy({id});  
        if (!user) {
            throw new NotFoundException("Usuário não encontrado.");
        }
        return user;
    }

    // @Post("/login")
    // @Redirect('/users', 301)
    // async fazerLogin(@Body() login: Login){
    //     const user = await this.usersRepository.findOneBy({ email: login.email, password: login.senha });

    //     if (user){
    //         return {url: '/users'};
    //     }else{
    //         throw new NotFoundException ("Usuário não encontrado!!");
    //     }
    // }

    @Post()
    async createUser(@Body() usersDTO: UsersDTO) {
        const user = new User();
        user.name = usersDTO.name;
        user.email = usersDTO.email;
        user.password = usersDTO.password;
        user.papel = usersDTO.papel;
        user.dataCadastro = usersDTO.created_at || new Date();

        await this.usersRepository.save(user); 
        return user;
    }

    @Delete(":id/delete")
    async deleteUser(@Param("id") id: number){
        const user = await this.usersRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException ("Usuário não encontrado!!")
        }
        await this.usersRepository.remove(user);
        return { message: "Usuário deletado com sucesso." };
    }
}