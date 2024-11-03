import { Injectable } from "@nestjs/common";
import { User } from './users.entity';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

export type Login = any;

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
    ) {}

    async findOne(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }
}