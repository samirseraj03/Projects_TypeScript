import { Router } from 'npm:express';
import { UserController } from  '../controllers/users.controller.ts';
import { AuthController } from  '../controllers/auth.controller.ts';
import { ProjectController } from  '../controllers/project.controller.ts';

const router = Router();

// gets
router.get("/login" , AuthController.getUserLogin);
router.get("/logout" , AuthController.getUserLogout);
router.get("/register" , UserController.createUser);
router.get("/project" , ProjectController.getProjectWithId);
router.get("/profile" , UserController.getUserById);

// post
router.post("/register" , AuthController.postNewRegister);
router.post("/project" , ProjectController.postProject);

// patch
router.patch("/project" , ProjectController.updateProject);
router.patch("/profile" , UserController.updateUser);

// delete
router.delete("/profile" , UserController.deleteUser);


// test 
router.get("/getusers" , UserController.gethelloworld)


export default router;





