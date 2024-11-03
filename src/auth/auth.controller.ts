import { Controller } from '@nestjs/common';
import { HttpCode, HttpStatus, Post, Body, Request, Get, UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from 'src/users/login.class';
import { AuthGuard, Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    signIn(@Body() loginDTO: Login) {
        return this.authService.signIn(loginDTO.email, loginDTO.senha);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}