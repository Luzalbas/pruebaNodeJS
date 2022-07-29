import { Request,Response } from 'express';
import User from '../models/user';
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

export const getUser = async( req: Request, res: Response ) =>{
    const { name } = req.params;
 
    try {
        const users = await User.findAll( { where: { name: {
            [Op.iLike]: `%${name}%`
          }} });
        res.json({
            users
        });
    } catch (error) {
        res.status(500).json({
            'msg':'Error'
        });
    }
}

export const getUsers = async( req: Request, res: Response ) =>{
    const { name } = req.params;
 
    try {
        const users = await User.findAll();
        res.json({
            users
        });
    } catch (error) {
        res.status(500).json({
            'msg':'Error'
        });
    }
}

export const postUser = async( req: Request, res: Response ) =>{
    const { body } = req;
    try { 
        const emailExist = await User.findOne({ where: { email: body.email } })
        console.log(body.email);
        console.log(emailExist);
        
        if(emailExist){
            return res.status(400).json({msg: 'Ya existe un usuario con este email' });
        }
        const user = new User(body);
        const userDB = await user.save();
        res.json({'user': userDB });
    } catch (error) {
        console.log('Error'+error);
        
        res.status(500).json( {
            msg: 'Error',
        })
    }
}

export const putUser = async( req: Request, res: Response ) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const idExist = await User.findByPk( id )
        if(!idExist){
            return res.status(400).json({msg: 'Usuario no existe' });
        }
        const usuarioDB = await User.update(
            { name: body.name, 
              email: body.email
            },
            { where: { id } });
        res.json({'user': { name: body.name, 
            email: body.email
          } });
    } catch (error) {
        console.log('Error'+error);
        
        res.status(500).json( {
            msg: 'Error',
        })
    }
    
}

export const deleteUser = async( req: Request, res: Response ) =>{
    const { id } = req.params;
    const userDelete = await User.destroy(
        { where: { 
                id: id
            } 
        });
        res.json({
            msg: 'delete API - controlador',
            id, 
            remove: userDelete
        })
}
