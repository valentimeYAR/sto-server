import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserWithOutPassword } from './entities/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(user: Partial<CreateUserDto>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.user.create({
      ...user,
      password: hashedPassword,
    });

    return this.user.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  findAll() {
    return this.user.find();
  }

  async findOne(id: number): Promise<UserWithOutPassword | null> {
    const { password: _, ...user } = await this.user.findOneBy({ id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
