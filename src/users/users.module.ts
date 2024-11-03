import { Module } from '@nestjs/common';
import { IndexController } from './index.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [IndexController],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UsersModule {}