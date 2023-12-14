import {Router} from "express";
import pool from "../bd/database.js";

const router = Router();

router.post('/usuarios', async(req, res) => {
    let salida = {
        error: 0,
        mensaje:''
    };
    try {
        const {nombre, apellidos, direccion, telefono, correo} = req.body;
        const newUsuario = {
            nombre, apellidos, direccion, telefono, correo
        };

        await pool.query('insert into usuarios set ?', [newUsuario]);
    } catch (error) {
        console.log(error);
        salida.error=1;
        salida.mensaje = "No se pudo registrar,vuelva intentar mas tarde";
    }
    res.json(salida);
});

router.get('/usuarios', async(req, res) => {
    let salida = {
        error: 0,
        usuarios: undefined
    };
    try {
        const [rows] = await pool.query('select * from usuarios');
        salida.usuarios=rows;
    } catch (error) {
        console.log(error);
        salida.error=1;
    }
    res.json(salida);
});

router.get('/usuarios/:id', async(req, res) => {
    let salida = {
        error: 0,
        usuarios: undefined
    };
    try {
        const {id} = req.params;
        const [rows] = await pool.query('select * from usuarios where id = ?', [id]);
        salida.usuarios= rows;
    } catch (error) {
        console.log(error);
        salida.error=1;
    }
    res.json(salida);
});

router.put('/usuarios/:id', async(req, res) => {
    let salida = {
        error: 0,
        mensaje:''
    };
    try {
        const {nombre, apellidos, direccion, telefono, correo} = req.body;
        const {id} = req.params;
        const editUsuarios = {
            nombre, apellidos, direccion, telefono, correo
        };

        await pool.query('update usuarios set ? where id = ?', [editUsuarios, id]);
    } catch (error) {
        console.log(error);
        salida.error=1;
        salida.mensaje = "No se pudo actualizar,vuelva intentar mas tarde";
    }
    res.json(salida);
});

router.delete('/usuarios/:id', async(req, res) => {
    let salida = {
        error: 0,
        mensaje:''
    };
    try {
        const {id} = req.params;

        await pool.query('delete from usuarios where id = ?', [id]);
    } catch (error) {
        console.log(error);
        salida.mensaje="No se pudo eliminar el registro,vuelva intentar mas tarde";
        salida.error=1;
    }
    res.json(salida);
});

export default router;