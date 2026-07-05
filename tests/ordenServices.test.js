import { jest } from "@jest/globals";
import { Orden } from "../src/domain/entities/Orden.js";
import { OrdenService } from "../src/application/services/ordenService.js";

describe("OrdenService", () => {
  let mockRepository;
  let service;

  beforeEach(() => {
    mockRepository = {
      guardar: jest.fn()
    };

    service = new OrdenService(mockRepository);
  });

  test("CP-01: debe crear una orden correctamente", () => {
    // Arrange
    const orden = new Orden(1, "Mantenimiento preventivo", "Pendiente", "2026-07-05");

    mockRepository.guardar.mockReturnValue({
      mensaje: "Orden registrada correctamente",
      orden
    });

    // Act
    const resultado = service.crearOrden(orden);

    // Assert
    expect(resultado.mensaje).toBe("Orden registrada correctamente");
    expect(resultado.orden.descripcion).toBe("Mantenimiento preventivo");
    expect(mockRepository.guardar).toHaveBeenCalledTimes(1);
  });

  test("CP-02: debe rechazar una orden sin descripción", () => {
    // Arrange
    const orden = new Orden(2, "", "Pendiente", "2026-07-05");

    // Act & Assert
    expect(() => service.crearOrden(orden)).toThrow("La descripción es obligatoria");
    expect(mockRepository.guardar).not.toHaveBeenCalled();
  });

  test("CP-03: debe rechazar una orden con estado inválido", () => {
    // Arrange
    const orden = new Orden(3, "Cambio de pieza", "Cancelado", "2026-07-05");

    // Act & Assert
    expect(() => service.crearOrden(orden)).toThrow("Estado inválido");
    expect(mockRepository.guardar).not.toHaveBeenCalled();
  });

  test("CP-04: debe llamar al repositorio una sola vez", () => {
    // Arrange
    const orden = new Orden(4, "Revisión general", "Completada", "2026-07-05");

    mockRepository.guardar.mockReturnValue({
      mensaje: "Orden registrada correctamente",
      orden
    });

    // Act
    service.crearOrden(orden);

    // Assert
    expect(mockRepository.guardar).toHaveBeenCalledTimes(1);
    expect(mockRepository.guardar).toHaveBeenCalledWith(orden);
  });

  test("CP-05: debe manejar error del repositorio", () => {
    // Arrange
    const orden = new Orden(5, "Falla del sistema", "Pendiente", "2026-07-05");

    mockRepository.guardar.mockImplementation(() => {
      throw new Error("Error al guardar la orden");
    });

    // Act & Assert
    expect(() => service.crearOrden(orden)).toThrow("Error al guardar la orden");
  });
});