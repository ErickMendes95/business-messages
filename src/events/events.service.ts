import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(eventData: CreateEventDto) {
    return this.prisma.event.create({ data: eventData });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({ data: updateEventDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
