import { Router } from 'npm:express';
import * as controllers from  '../controllers/tasks.controller.ts';

const router = Router();

// gets
router.get("/login" , controllers.getLogin);
router.get("/logout" , controllers.getLogout);
router.get("/register" , controllers.getRegister);
router.get("/project" , controllers.getProject);
router.get("/profile" , controllers.getProfile);

// post
router.post("/register" , controllers.postRegister);
router.post("/project" , controllers.postProject);

// patch
router.patch("/project" , controllers.patchProject);
router.patch("/profile" , controllers.patchProfile);

// delete
router.delete("/profile" , controllers.deleteProfile);



export default router;





