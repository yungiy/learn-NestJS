import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);
    return user;
  }

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: User) {
    console.log(user);
    return this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
