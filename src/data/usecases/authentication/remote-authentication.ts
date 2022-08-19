import { AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpPostClient } from "@/data/protocolos/http/http-post-client";
import { HttpStatusCode } from "@/data/protocolos/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AccountModel } from "@/domain/models/account-model";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
        url: this.url,
        body: params
    });

    switch(httpResponse.statusCode){
      case HttpStatusCode.ok: break
      case HttpStatusCode.unathourized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
