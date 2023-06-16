export abstract class AbstractApiService {
  abstract getRandomJoke(): Promise<string>;
}
