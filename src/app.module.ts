import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
