import { _Request , _Response }from 'npm:express';
// import Models
import { User } from '../models/User.models.ts';





export class AuthController {
    public static getLogin(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }
  
    public static getRegister(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }
  
    public static postRegister(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }
  
    public static getLogout(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }

    public static getProfile(_req: _Request, _res: _Response): void {
        _res.send('hello world');
      }
    
      public static patchProfile(_req: _Request, _res: _Response): void {
        _res.send('hello world');
      }
    
      public static deleteProfile(_req: _Request, _res: _Response): void {
        _res.send('hello world');
      }
}