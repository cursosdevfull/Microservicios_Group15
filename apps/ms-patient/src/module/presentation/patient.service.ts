import * as bcrypt from 'bcryptjs';

export class PatientService {
    static async crypt(text: string): Promise<string> {
        return await bcrypt.hash(text, 10)
    }
}