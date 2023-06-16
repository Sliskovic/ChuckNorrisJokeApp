import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(param: any) {
    super(`Entity with "${param}" not found.`, HttpStatus.NOT_FOUND);
  }
}
