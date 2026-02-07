const express = require('express')
const { router: pedidosRouter } = require('./src/routes/pedidos.routes')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API PARA Actividad 3 STATUS OK');
})

app.use('/pedidos', pedidosRouter);

app.listen(3000, () => {
  console.log("Servidor Corriendo")
})