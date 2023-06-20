import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver('MediaUploads')
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(returns => String)
    async generateUrl(@Args('fileName')fileName: string, @Args('fileType')fileType: string) {
        return await this.appService.getPresignedUrl(fileName, fileType);
    }
}
