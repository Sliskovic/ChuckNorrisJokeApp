import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

import { AbstractApiService } from './abstract/abstract.api.service';
import { ApiResponseDto } from './dto/api.dto';

@Injectable()
export class ApiService extends AbstractApiService {
  private readonly apiUrl = this.config.get('API_URL');
  private readonly token: string;
  constructor(private config: ConfigService) {
    super();
  }

  async getRandomJoke(): Promise<string> {
    try {
      const headers = { Authorization: `Bearer ${this.token}` };

      const response: AxiosResponse<ApiResponseDto> =
        await axios.get<ApiResponseDto>(this.apiUrl, { headers });
      return response.data.value;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
