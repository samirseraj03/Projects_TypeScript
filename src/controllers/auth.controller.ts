import { _Request, _Response } from 'npm:express';
import bcrypt from 'npm:bcrypt';

// import Models
import { User } from '../models/User.models.ts';





export class AuthController {
  public static async getUserLogin(_req: _Request, _res: _Response): Promise<void> {

    // Variabls
    const { identifier, password } = _req.body;
    let isEmail: boolean = false

    // Check if the identifier and password exist
    if (!identifier || !password) {
      _res.status(400).json({ message: 'The username or email and password are required.' });
      return;
    }

    try {
      // Determine if it is an email or a username
      isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      // serach user if exist
      const user = await User.findOne(isEmail ? { email: identifier } : { username: identifier });
      // user if not exist
      if (!user) {
        _res.status(404).json({ message: 'User not found.' });
        return;
      }
      // Verificar la contraseña
      const isPasswordValid = await this.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        _res.status(401).json({ message: 'Incorrect Password.' });
        return;
      }
      // If all correct
      _res.status(200).json({
        message: 'Inicio de sesión exitoso.',
        user_id: user._id,
        // test
        user,
      });
    } catch (error) {
      console.error(error);
      _res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }


  public static postNewRegister(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }




  public static getUserLogout(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }

  public static getProfile(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }

  public static patchProfile(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }

  public static deleteUser(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }


  // Other metohds to login
  public static getUserLoginWithGithub(_req: _Request, _res: _Response): void {

  };
  public static getUserLoginWithGoogle(_req: _Request, _res: _Response): void {

  };

  // Other metohds to register
  public static postNewRegisterWithGithub(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }

  public static postNewRegisterWithGoogle(_req: _Request, _res: _Response): void {
    _res.send('hello world');
  }


  // PRIVATE FUNCTION

  // Function to verify the password
  private static async verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedHash);
  }

}