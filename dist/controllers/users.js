"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUsers = exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const users = yield user_1.default.findAll({ where: { name: {
                    [Op.iLike]: `%${name}%`
                } } });
        res.json({
            users
        });
    }
    catch (error) {
        res.status(500).json({
            'msg': 'Error'
        });
    }
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const users = yield user_1.default.findAll();
        res.json({
            users
        });
    }
    catch (error) {
        res.status(500).json({
            'msg': 'Error'
        });
    }
});
exports.getUsers = getUsers;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExist = yield user_1.default.findOne({ where: { email: body.email } });
        console.log(body.email);
        console.log(emailExist);
        if (emailExist) {
            return res.status(400).json({ msg: 'Ya existe un usuario con este email' });
        }
        const user = new user_1.default(body);
        const userDB = yield user.save();
        res.json({ 'user': userDB });
    }
    catch (error) {
        console.log('Error' + error);
        res.status(500).json({
            msg: 'Error',
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const idExist = yield user_1.default.findByPk(id);
        if (!idExist) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        }
        const usuarioDB = yield user_1.default.update({ name: body.name,
            email: body.email
        }, { where: { id } });
        res.json({ 'user': { name: body.name,
                email: body.email
            } });
    }
    catch (error) {
        console.log('Error' + error);
        res.status(500).json({
            msg: 'Error',
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userDelete = yield user_1.default.destroy({ where: {
            id: id
        }
    });
    res.json({
        msg: 'delete API - controlador',
        id,
        remove: userDelete
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map