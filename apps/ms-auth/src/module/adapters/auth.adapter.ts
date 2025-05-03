import { Auth } from "../application";
import { AuthPort } from "../ports";

import { env } from '../../env';

export class AuthAdapter implements AuthPort {
    async login(auth: Auth): Promise<any> {
        const {email} = auth.properties

        const response = await fetch(`${env.SERVICE_NAME_PATIENT}/email/${email}`)

        return await response.json()
    }

}