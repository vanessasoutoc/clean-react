import { AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpPostClient } from "@/data/protocolos/http/http-post-client";
import { HttpStatusCode } from "@/data/protocolos/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
        url: this.url,
        body: params
    });

    switch(httpResponse.statusCode){
      case HttpStatusCode.unathourized: throw new InvalidCredentialsError()
      default: return Promise.resolve()
    }
  }
}
