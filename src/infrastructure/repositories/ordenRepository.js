import { OrdenRepositoryPort } from "../../domain/ports/ordenRepositoryPort.js";

export class OrdenRepository extends OrdenRepositoryPort {
  guardar(orden) {
    return {
      mensaje: "Orden registrada correctamente",
      orden
    };
  }
}