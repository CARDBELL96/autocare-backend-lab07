export class OrdenService {
  constructor(repository) {
    this.repository = repository;
  }

  crearOrden(orden) {

    if (!orden.descripcion) {
      throw new Error("La descripción es obligatoria");
    }

    if (!["Pendiente", "Completada"].includes(orden.estado)) {
      throw new Error("Estado inválido");
    }

    return this.repository.guardar(orden);
  }
}