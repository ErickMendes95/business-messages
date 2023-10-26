import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(eventData: CreateEventDto) {

    if (!eventData) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    const eventExist = await this.prisma.event.findFirst({
      where: { title: eventData.title },
    });

    if (eventExist) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const event = await this.prisma.event.create({ data: eventData });

    return event;
  }

  async findAll() {
    
    const events = await this.prisma.event.findMany();
    
    if (events.length === 0) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    
    return events;
  }

  async findOne(id: number) {
    
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.event.update({
      data: updateEventDto,
      where: { id },
    });
  }

  async delete(id: number) {
    
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.event.delete({ where: { id } });
  }
}
