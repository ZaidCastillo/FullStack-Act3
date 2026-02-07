class PedidosRepository {
  constructor() {
    this.pedidos = [];
    this.nextId = 1;
  }

  getAll() {
    return this.pedidos;
  }

  getById(id) {
    return this.pedidos.find(pedido => pedido.id === id);
  }

  create(producto, cantidad) {
    const newPedido = { 
      id: this.nextId++, 
      producto, 
      cantidad, 
      status: "pendiente"
    };
    this.pedidos.push(newPedido);
    return newPedido;
  }

  updateStatus(id, newStatus) {
    const pedido = this.getById(id);
    if (pedido) {
      pedido.status = newStatus;
      return pedido;
    }
    return null;
  }

  delete(id) {
    const index = this.pedidos.findIndex(pedido => pedido.id === id);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      return true;
    }
    return false;
  }

  findByStatus(status) {
    return this.pedidos.filter(pedido => pedido.status === status);
  }
}

module.exports = { PedidosRepository };