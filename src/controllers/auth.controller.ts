import { _Request, _Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';

// import Models
import { User, IUser } from "../models/User.models.ts";
import { Auth } from '../models/Auths.models.ts'; // Asegúrate de que la ruta del modelo de Auth sea correcta


export class AuthController {

  // login user
  public static async getUserLogin(
    _req: _Request,
    _res: _Response
  ): Promise<void> {
    // Variabls
    const { identifier, password } = _req.body;
    let isEmail: boolean = false;

    // Check if the identifier and password exist
    if (!identifier || !password) {
      _res
        .status(400)
        .json({ message: "The username or email and password are required." });
      return;
    }

    try {
      // Determine if it is an email or a username
      isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      // serach user if exist
      const user = await User.findOne(
        isEmail ? { email: identifier } : { username: identifier }
      );
      // user if not exist
      if (!user) {
        _res.status(404).json({ message: "User not found." });
        return;
      }
      // Verfied if Passowrd valid
      const isPasswordValid = await this.verifyPassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        _res.status(401).json({ message: "Incorrect Password." });
        return;
      }
      // If all correct
      _res.status(200).json({
        message: "Inicio de sesión exitoso.",
        user_id: user._id,
        // test
        user,
      });
    } catch (error) {
      console.error(error);
      _res.status(500).json({ message: "Error interno del servidor." });
    }
  }


  // post new register
  public static async postNewRegister(
    _req: _Request,
    _res: _Response
  ): Promise<void> {
    try {
      // Check if required fields are in the request body
      const { email, username, password }: Partial<IUser> = _req.body;

      if (!email || !username || !password) {
        return _res.status(400).json({
          message: "Los campos email, username y password son obligatorios.",
        });
      }

      // Check if a user with the same email or username already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return _res
          .status(400)
          .json({ message: "El email o username ya están en uso." });
      }
      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new Interface To upload new User
      const newUser: IUser = {
        _id: "",
        name: _req.body.name ?? "",
        lastname: _req.body.lastname ?? "",
        email: email,
        username: username,
        age: _req.body.age ?? 0,
        password: hashedPassword,
        bio: _req.body.bio ?? "",
        tags: _req.body.tags ?? [],
        country: _req.body.country ?? "",
        language: _req.body.language ?? "",
        avatarUrl: _req.body.avatarUrl ?? "",
        linkedin: _req.body.linkedin ?? "",
        website: _req.body.website ?? "",
        repositoryUser: _req.body.repositoryUser ?? "",
        lastLogin: _req.body.lastLogin ?? new Date(),
        theme: _req.body.theme ?? "light",
        verified: _req.body.verified ?? false,
        emailVisibility: _req.body.emailVisibility ?? false,
      };
      // Save the user to the database
      const createdUser = await User.create(newUser);
      // Respond with the created user data
      return _res.status(201).json({
        message: "User registered successfully.",
        user: {
          id: createdUser._id,
          name: createdUser.name,
          username: createdUser.username,
          email: createdUser.email,
        },
      });
    } catch {
      _res
        .status(500)
        .json({ message: "Ocurrió un error al registrar el usuario." });
    }
  }

  public static getUserLogout(_req: _Request, _res: _Response): void {
    // taking into account that the frontend is responsible for closing the user's session.
    // redirecting the user to the login page or to the home page
    _res.status(200).json({
      message: "Logout exitoso",
    });
  }


  public static async ResetPassword(_req: _Request, _res: _Response): Promise<void> {
    // Variabls
    const { identifier } = _req.body;
    let isEmail: boolean = false;

    try {
      // Determine if it is an email or a username
      isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      // serach user if exist
      const user = await User.findOne(isEmail ? { email: identifier } : { username: identifier });
    
      // user if not exist
      if (!user) {
        _res.status(404).json({ message: "User not found." });
        return;
      }


       // Generar el token de restablecimiento
      const resetToken = this.generateToken(); // Implementa esta función para generar un token único
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // El token expirará en 1 hora, puedes ajustarlo según lo necesites

      // Guardar el token en el modelo Auth
      const auth = new Auth({
        userId: user._id,
        resetToken,
        expiresAt,
      });

    await auth.save(); // Guardamos el documento en la colección Auth

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o el servicio de correo que prefieras
      auth: {
        user: 'tu-email@gmail.com', // Reemplaza con tu email
        pass: 'tu-contraseña' // Reemplaza con tu contraseña
      }
    });

    // Crear el contenido del correo
    const mailOptions = {
      from: 'tu-email@gmail.com', // Reemplaza con tu email
      to: user.email, // El email del usuario
      subject: 'Restablecimiento de contraseña',
      html: `
        <h1>Restablece tu contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="https://tu-dominio.com/reset-password?token=${resetToken}">Restablecer contraseña</a>
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Responder al cliente con un mensaje de éxito
    _res.status(200).json({ message: 'Restablecimiento de contraseña enviado al correo.' });

  }  catch{
    _res.status(500).json({ message: "Ocurrio un error en el servidor" });
  }
}



public static async UpdatePasswordWithTokenValidation(_req: _Request, _res: _Response): Promise<void> {
  const { token, newPassword } = _req.body; // Recibe el token y la nueva contraseña

  try {
    // Validar el token en la base de datos (comprobamos que no haya expirado)
    const authRecord = await Auth.findOne({ resetToken: token, expiresAt: { $gt: new Date() } });

    // Si no existe el token o ha expirado
    if (!authRecord) {
      return _res.status(400).json({ message: 'El token de restablecimiento es inválido o ha expirado.' });
    }

    // Encontrar el usuario usando el userId del authRecord
    const user = await User.findById(authRecord.userId);

    if (!user) {
      return _res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en el modelo de User
    user.password = hashedPassword;
    await user.save();

    // Eliminar el registro del token para evitar futuros usos
    await Auth.deleteOne({ resetToken: token });

    // Responder al cliente con éxito
    _res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });

  } catch (error) {
    console.error(error); // Para ayudar a depurar en caso de error
    _res.status(500).json({ message: 'Ocurrió un error al restablecer la contraseña.' });
  }
}



public static async sendVerificationEmail(_req: _Request, _res: _Response): Promise<void> {
  const { email } = _req.body; // Suponiendo que el email se pasa en el cuerpo de la solicitud

  try {
    // Buscar si el usuario ya existe
    const user = await User.findOne({ email });
    
    if (!user) {
      return _res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Generar un token único para la verificación
    const verificationToken = this.generateToken(); // Implementa esta función para generar un token único
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // El token expirará en 1 hora (ajustable según necesidades)

    // Guardar el token de verificación en el modelo Auth
    const auth = new Auth({
      userId: user._id,
      verificationToken,
      expiresAt,
    });

    await auth.save(); // Guardar el registro de Auth

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o el servicio de correo que prefieras
      auth: {
        user: 'tu-email@gmail.com', // Reemplaza con tu email
        pass: 'tu-contraseña' // Reemplaza con tu contraseña
      }
    });

    // Crear el contenido del correo
    const mailOptions = {
      from: 'tu-email@gmail.com', // Reemplaza con tu email
      to: user.email, // El email del usuario
      subject: 'Verificación de correo electrónico',
      html: `
        <h1>Verifica tu correo electrónico</h1>
        <p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
        <a href="https://tu-dominio.com/verify-email?token=${verificationToken}">Verificar correo electrónico</a>
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Responder al cliente con un mensaje de éxito
    _res.status(200).json({ message: 'Correo de verificación enviado.' });

  } catch (error) {
    console.error(error); // Para ayudar a depurar en caso de error
    _res.status(500).json({ message: 'Ocurrió un error al enviar el correo de verificación.' });
  }
}


public static async verifyEmail(_req: _Request, _res: _Response): Promise<void> {
  const { token } = _req.query; // El token de verificación estará en la URL como parámetro

  try {
    // Buscar el registro del token de verificación en la base de datos
    const authRecord = await Auth.findOne({
      verificationToken: token,
      expiresAt: { $gt: new Date() }, // Comprobar que el token no haya expirado
    });

    if (!authRecord) {
      return _res.status(400).json({ message: 'Token de verificación inválido o expirado.' });
    }

    // Encontrar al usuario usando el userId del authRecord
    const user = await User.findById(authRecord.userId);

    if (!user) {
      return _res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Actualizar el campo `verified` del usuario a `true`
    user.verified = true;
    await user.save();

    // Eliminar el token de verificación de la base de datos
    await Auth.deleteOne({ verificationToken: token });

    // Responder al cliente con un mensaje de éxito
    _res.status(200).json({ message: 'Correo electrónico verificado exitosamente.' });

  } catch (error) {
    console.error(error); // Para ayudar a depurar en caso de error
    _res.status(500).json({ message: 'Ocurrió un error al verificar el correo electrónico.' });
  }
}



  // Other metohds to login
  public static getUserLoginWithGithub(_req: _Request, _res: _Response): void {}
  public static getUserLoginWithGoogle(_req: _Request, _res: _Response): void {}

  // Other metohds to register
  public static postNewRegisterWithGithub(_req: _Request,_res: _Response): void {
    _res.send("hello world");
  }

  public static postNewRegisterWithGoogle(
    _req: _Request,
    _res: _Response
  ): void {
    _res.send("hello world");
  }

  // PRIVATE FUNCTION

  // Function to verify the password
  private static async verifyPassword(
    inputPassword: string,
    storedHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedHash);
  }


  // Función para generar un token de restablecimiento (esto es solo un ejemplo)
  private static  generateToken(): string {
    return Math.random().toString(36).substring(2); // Esto generará un token aleatorio
}

}
