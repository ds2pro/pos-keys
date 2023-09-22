import { EncryptTextDto } from '@/dtos/util.dto';
import { EncryptTextRequest } from '@/requests/util.request';
import { EncryptTextResponse } from '@/response/util.response';
import * as crypto from 'crypto';

interface IUtilsService {
  encryptText(dto: EncryptTextDto): Promise<EncryptTextResponse>;
}
class UtilsService implements IUtilsService {
  async encryptText(dto: EncryptTextRequest): Promise<EncryptTextResponse> {
    const algorithm = 'aes-256-cbc';

    const cipher = crypto.createCipheriv(algorithm, dto.key, dto.iv);
    const data = dto.text;
    const dataString = typeof data === 'number' ? String(data) : data;

    let encryptedData = cipher.update(dataString, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  }
}

export default UtilsService;
