import { _Request , _Response }from 'npm:express';
// import Models
import { User } from '../models/User.models.ts';
import { Project , IProject } from '../models/Projects.models.ts'; // Asegúrate de que la ruta del modelo de Project sea correcta




export class ProjectController {
  
    public static async  getProjectsWithIdUser(_req: _Request, _res: _Response): Promise<void> {
      const { userId } = _req.params; 

      try {
        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(userId);
    
        if (!user) {
          return _res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    
        // Obtener todos los proyectos asociados al userId
        const projects = await Project.find({ userId }); // Filtramos por el userId en la colección de proyectos
    
        if (projects.length === 0) {
          return _res.status(404).json({ message: 'No se encontraron proyectos para este usuario.' });
        }
    
        // Devolver los proyectos encontrados
        _res.status(200).json({ projects });
      } catch (error) {
        console.error(error); // Para ayudar a depurar en caso de error
        _res.status(500).json({ message: 'Ocurrió un error al obtener los proyectos.' });
      }

    }
  
    public static async postProject(_req: _Request, _res: _Response): Promise<void> {

        const { id_user, title, subtitle, tags, status, source_type, image_url, archive_md_url } = _req.body; 

        try {
          // Verificar si el usuario existe
          const user = await User.findById(id_user);
          if (!user) {
            return _res.status(404).json({ message: 'Usuario no encontrado.' });
          }

          // Validar el campo 'title'
          if (!title || title.trim() === '') {
            return _res.status(400).json({ message: 'El título es obligatorio.' });
          }

      
          // Crear un nuevo proyecto con los datos proporcionados
          const newProject = new Project({
            id_user,
            title,
            subtitle : subtitle || "",
            tags : tags || [],
            status: status || 'draft', // Si no se proporciona, el valor por defecto será 'draft'
            source_type: source_type || 'open', // Si no se proporciona, el valor por defecto será 'open'
            image_url: image_url || "",
            archive_md_url : archive_md_url || "" ,
          });
      
          // Guardar el nuevo proyecto en la base de datos
          await newProject.save();
      
          // Devolver el proyecto creado
          _res.status(201).json({ project: newProject });
        } catch (error) {
          console.error(error); // Para ayudar a depurar en caso de error
          _res.status(500).json({ message: 'Ocurrió un error al crear el proyecto.' });
        }
    }

    public static async getProjectWithId(_req: _Request, _res: _Response): Promise<void> {
      const { projectId } = _req.params; // El projectId se pasa en la URL como parámetro
    
      try {
        // Buscar el proyecto por su ID
        const project = await Project.findById(projectId);
    
        // Verificar si el proyecto existe
        if (!project) {
          return _res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
    
        // Devolver el proyecto encontrado
        _res.status(200).json({ project });
      } catch  {
        _res.status(500).json({ message: 'Ocurrió un error al obtener el proyecto.' });
      }
    }
    
  
    public static async updateProject(_req: _Request, _res: _Response): Promise<void> {
      const { projectId } = _req.params; // El projectId se pasa en la URL como parámetro
      const updateData : IProject  = _req.body; // Obtener todo el cuerpo de la solicitud
    
      try {
        // Buscar el proyecto por su ID
        const project = await Project.findById(projectId);
    
        // Verificar si el proyecto existe
        if (!project) {
          return _res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
    
         // Actualizar el proyecto con todos los campos del cuerpo de la solicitud
          Object.assign(project, updateData); // Asigna directamente los datos del cuerpo al proyecto

        // Guardar los cambios en la base de datos
        await project.save();
    
        // Devolver el proyecto actualizado
        _res.status(200).json({ project });
      } catch (error) {
        console.error(error); // Para ayudar a depurar en caso de error
        _res.status(500).json({ message: 'Ocurrió un error al actualizar el proyecto.' });
      }
    }


    public static async deleteProject(_req: _Request, _res: _Response): Promise<void> {
      const { projectId } = _req.params; // Obtener el ID del proyecto desde los parámetros de la solicitud
    
      try {
        // Buscar el proyecto por su ID
        const project = await User.findByIdAndDelete(projectId);
    
        // Verificar si el proyecto existe
        if (!project) {
          return _res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
    
        // Responder con un mensaje de éxito
        _res.status(200).json({ message: 'Proyecto eliminado correctamente.' });
      } catch (error) {
        console.error(error); // Para ayudar a depurar en caso de error
        _res.status(500).json({ message: 'Ocurrió un error al eliminar el proyecto.' });
      }
    }

    public static async updateReadmeWithProjectId (_req: _Request, _res: _Response): Promise<void> {

    }


  }
  