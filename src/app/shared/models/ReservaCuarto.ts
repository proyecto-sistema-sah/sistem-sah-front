import { EstadoReserva } from "./EstadoReserva";
import { Usuario } from "./Usuario";

export class ReservaCuarto{

  // Código de la reserva
  codigoReserva?: string;

  // Fecha de inicio de la reserva
  fechaInicioReserva?: Date | null; // Usar formato ISO de fecha: 'yyyy-MM-dd'

  // Fecha de fin de la reserva
  fechaFinReserva?: Date | null; // Usar formato ISO de fecha: 'yyyy-MM-dd'

  // Fecha de creación de la reserva
  fechaCreacionReserva?: Date; // Usar formato ISO completo: 'yyyy-MM-ddTHH:mm:ss'

  // Fecha de actualización de la reserva
  fechaActualizacionReserva?: Date; // Usar formato ISO completo: 'yyyy-MM-ddTHH:mm:ss'

  // Valor total de la reserva
  valorTotalReserva?: number; // Representación de BigDecimal en TypeScript

  // Usuario asociado a la reserva
  codigoUsuarioDtoFk?: Usuario;

  // Estado de la reserva
  estadoReservaDtoFk?: EstadoReserva;

  // Código del cuarto asociado a la reserva
  codigoCuarto?: string;


}