import { Router } from 'npm:express';
import { UserController } from  '../controllers/users.controller.ts';
import { AuthController } from  '../controllers/auth.controller.ts';
import { ProjectController } from  '../controllers/project.controller.ts';

const router = Router();

// gets
router.get("/login" , AuthController.getLogin);
router.get("/logout" , AuthController.getLogout);
router.get("/register" , UserController.createUser);
router.get("/project" , ProjectController.getProject);
router.get("/profile" , AuthController.getProfile);

// post
router.post("/register" , AuthController.postRegister);
router.post("/project" , ProjectController.postProject);

// patch
router.patch("/project" , ProjectController.patchProject);
router.patch("/profile" , AuthController.patchProfile);

// delete
router.delete("/profile" , UserController.deleteUser);


// test 
router.get("/getusers" , UserController.getAllUsers)


export default router;





