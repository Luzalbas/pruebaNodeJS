import { Router } from 'express';
import { getUser,
         getUsers,
         postUser,
         putUser,
         deleteUser} from '../controllers/users';

const router = Router();

router.get('/all',getUsers);
router.get('/:name',getUser);
router.post('/',postUser);
router.put('/:id',putUser);
router.delete('/:id',deleteUser);

export default router;
