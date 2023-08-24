const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');

router.get('/', async (req, res)=>{
    try{
        const libros = await Libro.find();
        res.json(libros);
    } catch (error){
        res.status(500).json({message: 'Error en la obtencion de libros'});
    }
})

router.post('/', async (req, res) => {
    try{
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    }catch (error){
        res.status(500).json({message: 'Error creando el libro'});
    }
})

router.put('/:id', async(req, res) =>{
    try{
        const libroActualizado = await Libro.findByIdAndUpdate(req.params.id, req.body, {new: true });
        res.json(libroActualizado);
    } catch (error){
        res.status(500).json({message: 'Error al actualizar'});
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message: 'Libro eliminado correctamente'})
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar'});
    }
})

module.exports = router;