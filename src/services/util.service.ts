import { DecryptTextDto, EncryptTextDto } from '@/dtos/util.dto';
import { EncryptTextRequest } from '@/requests/util.request';
import { DecryptTextResponse, EncryptTextResponse } from '@/response/util.response';
import * as crypto from 'crypto';

interface IUtilsService {
  encryptText(dto: EncryptTextDto): EncryptTextResponse;
  decryptText(dto: DecryptTextDto): DecryptTextResponse;
}
class UtilsService implements IUtilsService {
  encryptText(dto: EncryptTextRequest): EncryptTextResponse {
    const algorithm = 'aes-256-cbc';

    const cipher = crypto.createCipheriv(algorithm, dto.key, dto.iv);
    const data = dto.text;
    const dataString = typeof data === 'number' ? String(data) : data;

    let encryptedData = cipher.update(dataString, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  decryptText(dto: DecryptTextDto): DecryptTextResponse {
    const algorithm = 'aes-256-cbc';

    const decipher = crypto.createDecipheriv(algorithm, dto.key, dto.iv);

    let decryptedData = decipher.update(dto.text, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}

export default UtilsService;
