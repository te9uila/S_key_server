import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User_info } from './entities/login.entity';
import { log_info } from './entities/log.entity';
import { pass_history } from './entities/pass_history.entity';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [TypeOrmModule.forFeature([User_info]), TypeOrmModule.forFeature([log_info]), TypeOrmModule.forFeature([pass_history])]
})
export class LoginModule { }
