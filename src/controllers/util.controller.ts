import { RequestWithUser } from '@/interfaces/auth.interface';
import { DecryptTextRequest, EncryptTextRequest } from '@/requests/util.request';
import UtilsService from '@/services/util.service';
import { Response, NextFunction } from 'express';

class UtilController {
  private utilsService = new UtilsService();

  public encryptText = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: EncryptTextRequest = req.body;
      const result = this.utilsService.encryptText({
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public decryptText = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: DecryptTextRequest = req.body;
      const result = this.utilsService.decryptText({
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public generateKeyIV = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = this.utilsService.generateKeyIv();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new UtilController();
