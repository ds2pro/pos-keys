import { DecryptTextDto, EncryptTextDto } from '@/dtos/util.dto';
import { EncryptTextRequest } from '@/requests/util.request';
import { DecryptTextResponse, EncryptTextResponse, GenerateKeyIvResponse } from '@/response/util.response';
import * as crypto from 'crypto';

interface IUtilsService {
  encryptText(dto: EncryptTextDto): EncryptTextResponse;
  decryptText(dto: DecryptTextDto): DecryptTextResponse;
  generateKeyIv(): GenerateKeyIvResponse;
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

  generateKeyIv(): GenerateKeyIvResponse {
    const key: string = crypto.randomBytes(16).toString('hex');
    const iv: string = crypto.randomBytes(8).toString('hex');

    return {
      key: key,
      iv: iv,
    };
  }
}

export default UtilsService;
