import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../lib/prismaService';

@Injectable()
// Serviço de usuário com injecção de dependência
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // Cria um novo usuário com base nos dados fornecidos
  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  // Busca um usuário por ID
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Atualiza um usuário por ID
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Exclui um usuário por ID
  async remove(id: string) {
    await this.findOne(id);

    return await this.prismaService.user.delete({ where: { id } });
  }
}
