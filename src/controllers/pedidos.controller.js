const { PedidosRepository } = require('../repositories/pedidos.repository');

const repo = new PedidosRepository();

function getAll(req, res) {
  return res.json(repo.getAll());
}

function getById(req, res) {
  const id = Number(req.params.id);
  const pedido = repo.getById(id);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  return res.json(pedido);
}

function create(req, res) {
  const { producto, cantidad } = req.body;

  if (!producto || typeof producto !== 'string') {
    return res.status(400).json({ error: 'Producto inválido' });
  }

  const cantidadNumber = Number(cantidad);
  if (!cantidadNumber || cantidadNumber <= 0) {
    return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
  }

  const nuevo = repo.create(producto, cantidadNumber);
  return res.status(201).json(nuevo);
}

function update(req, res) {
  const id = Number(req.params.id);
  const { status } = req.body;

  const pedido = repo.getById(id);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  if (pedido.status !== 'pendiente') {
    return res.status(400).json({ error: 'No es posible modificar un pedido finalizado o cancelado' });
  }

  const estadosValidos = ['confirmado', 'cancelado'];
  if (!estadosValidos.includes(status)) {
    return res.status(400).json({ error: 'Estado inválido.' });
  }

  const actualizado = repo.updateStatus(id, status);
  return res.json(actualizado);
}

function remove(req, res) {
  const id = Number(req.params.id);
  const pedido = repo.getById(id);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  if (pedido.status !== 'pendiente') {
    return res.status(400).json({ error: 'No se puede eliminar un pedido que no está en estado pendiente' });
  }

  repo.delete(id);
  return res.status(204).json(({mensaje: 'Pedido eliminado'}));
}


function getByStatus(req, res) {
  const { status } = req.params;
  
  const estadosValidos = ['pendiente', 'confirmado', 'cancelado'];
  if (!estadosValidos.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
  }
  
  const resultados = repo.findByStatus(status);
  return res.json(resultados);
}


module.exports = { getAll, getById, create, update, remove, getByStatus };