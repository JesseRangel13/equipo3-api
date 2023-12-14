import {Router} from "express";
import pool from "../bd/database.js";

const router = Router();

// router.get('/add', async(req, res) => {
//     res.render('hamburguesas/add');
// });

router.post('/hamburguesas', async(req, res) => {
    
    let salida = {
        error: 0,
        mensaje:''
    };
    try {
        const {nombre, descripcion, calorias, imagen} = req.body;
        const newHamburguesa = {
            nombre, descripcion, calorias, imagen
        };
        
        await pool.query('insert into hamburguesas set ?', [newHamburguesa]);
    } catch (error) {
        console.log(error);
        salida.error=1;
        salida.mensaje = "No se pudo registrar,vuelva intentar mas tarde";

        
    }
    res.json(salida);
});

router.get('/hamburguesas', async(req, res) => {
    let salida = {
        error: 0,
        hamburguesas: undefined
    };
    try {
         const [rows, fields] = await pool.query('select * from hamburguesas');
         salida.hamburguesas=rows;
    } catch (error) {
        console.log(error);
        salida.error=1;
    }

    res.json(salida);
});

router.get('/hamburguesas/:id', async(req, res) => {
    let salida = {
        error: 0,
        hamburguesas: undefined
    };
    try {
        const {id} = req.params;
        const [rows, fields] = await pool.query('select * from hamburguesas where id = ?', [id]);
        salida.hamburguesas=rows;
    } catch (error) {
        console.log(error);
        salida.error=1;

    }
    res.json(salida);
});

router.put('/hamburguesas/:id', async(req, res) => {
    
    let salida = {
        error: 0,
        mensaje:''
    };
    try {
        const {nombre, descripcion, calorias, imagen} = req.body;
        const {id} = req.params;
        const editHamburguesa = {
            nombre, descripcion, calorias, imagen
        };
        await pool.query('update hamburguesas set ? where id = ?', [editHamburguesa, id]);
    } catch (error) {
        console.log(error);
        salida.error=1;
        salida.mensaje = "No se pudo actualizar,vuelva intentar mas tarde";
    }
    res.json(salida);
});

router.delete('/hamburguesas/:id', async(req, res) => {
    
    let salida = {
        error: 0,
        mensaje:''
    };
    try {
        const {id} = req.params;
        await pool.query('delete from hamburguesas where id = ?', [id]);
    } catch (error) {
        console.log(error);
        salida.mensaje="No se pudo eliminar el registro,vuelva intentar mas tarde";
        salida.error=1;
    }

    res.json(salida);
});

export default router;