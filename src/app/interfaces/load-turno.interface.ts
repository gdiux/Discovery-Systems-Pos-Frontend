import { _caja, _cajero } from './load-caja.interface';



export interface LoadTurno {

    caja: _caja;
    cajero: _cajero;
    cerrado: boolean;
    diferencia: boolean;
    fecha: Date;
    initial: number;
    status: boolean;
    movements?: any[];
    abonos?: any[];
    sales?: any[];
    tid?: string;

}