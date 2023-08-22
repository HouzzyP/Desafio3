import express from 'express'
import {ProductManager} from './Desafio3.js'
const manager = new ProductManager()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/products',(req,res)  => {
    manager.getProducts()
    .then((data) => {
        
        if(parseInt(req.query.limit) < data.length){
            const newData = data.splice(0,req.query.limit)
            res.send({Productos: newData})
        }else{
            res.send({Productos: data})
        }
    })
})

app.get('/products/:pid',(req,res)  => {
    manager.getProductsById(parseInt(req.params.pid))
    .then((data) => {
        if(typeof data === 'object'){
            res.send(data)
        }else{
            res.send({'Error' : data, 'id': parseInt(req.params.pid)})
        }
        
        
    })
})

app.listen(8080,() =>console.log('Servidor arriba puerto 8080'))