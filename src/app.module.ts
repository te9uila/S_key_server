import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      retryDelay: 500,
      retryAttempts: 10,
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
