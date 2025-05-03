import { Auth } from "../application"

export type AuthPort = {
    login(auth: Auth): Promise<any>
}