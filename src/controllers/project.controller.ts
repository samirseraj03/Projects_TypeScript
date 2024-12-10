import { _Request , _Response }from 'npm:express';
// import Models
import { User } from '../models/User.models.ts';




export class ProjectController {
    public static getProject(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }
  
    public static postProject(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }
  
    public static patchProject(_req: _Request, _res: _Response): void {
      _res.send('hello world');
    }
  }
  