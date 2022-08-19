import { Authentication, AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpPostClient, HttpStatusCode } from "@/data/protocolos/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
        url: this.url,
        body: params
    });

    switch(httpResponse.statusCode){
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unathourized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
