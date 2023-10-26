import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      
      return await this.eventsService.create(createEventDto);
    
    } catch (error) {
      
      if (error.message == 'BadRequest') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      
      if (error.message == 'Conflict') {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      
      return await this.eventsService.findAll();
    
    } catch (error) {
      
      if(error.message == "NotFound"){
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
      
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.eventsService.findOne(+id);
    } catch (error) {

      if(error.message == "NotFound"){
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    try {
      return await this.eventsService.update(+id, updateEventDto);
    } catch (error) {
      
      if(error.message == "NotFound"){
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
      
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.eventsService.delete(+id);
    } catch (error) {
      
      if(error.message == "NotFound"){
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
      
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
