import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; 
import { jwtConstants } from './constant'; 
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,                
      secret: jwtConstants.secret,  
      signOptions: { expiresIn: '60s' }, 
    }),
  ],
  controllers: [AuthController],      
  providers: [
    AuthService,                   
    UserService,    
    {
      provide: APP_GUARD,            
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
