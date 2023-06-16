import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

import { EmailSendingResult } from './dto/emailResponse.dto';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  constructor(private mailerService: MailerService) {}

  async sendUserJoke(
    email: string,
    joke: string,
    name: string,
  ): Promise<EmailSendingResult> {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Chuck Norris Joke',
        template: './email', // `.ejs` extension is appended automatically
        context: {
          name: name, // filling <%= %> brackets from template with content
          joke,
        },
      });
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  }
}
