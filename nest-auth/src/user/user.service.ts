import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email) {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
