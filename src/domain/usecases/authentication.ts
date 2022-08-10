import { AccountModel } from '../models/account-model'

type AuthenticationParams{
    email:string
    password: string
}

export interface authentication{
    auth(params: AuthenticationParams): Promise<AccountModel>
}