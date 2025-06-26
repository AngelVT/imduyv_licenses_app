import { Router } from "express";
import * as userControl from '../controllers/users.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

const SYSTEM = ['system'];

router.get('/info',
    authenticator.verifyToken(),
    userControl.getUserInfo);

router.get('/', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:read', 'user:manage'])
], userControl.getUsers);

router.get('/:userID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:read', 'user:manage'])
], userControl.getUser);

router.get('/byName/:name', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:read', 'user:manage'])
], userControl.getUserByName);

router.get('/byUsername/:username', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:read', 'user:manage'])
], userControl.getUserByUsername);

router.get('/byGroup/:group', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:read', 'user:manage'])
], userControl.getUserByGroup);

router.post('/', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:create', 'user:manage'])
], userControl.createUser);

router.patch('/:userID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:update', 'user:manage'])
], userControl.updateUser);

router.delete('/:userID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:delete', 'user:manage'])
], userControl.deleteUser);

router.get('/QR/:QR', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(SYSTEM),
    authenticator.verifyPermission(['user:create', 'user:manage'])
], userControl.getUserQR);

export default router;