import { IBusinessInformation, IChecaLinea } from "@/lib/utils";

export interface IBusinessBase {
    id: number,
    ruc: string,
    created_at: Date,
    consulta_ruc: IBusinessInformation,
    checa_linea: IChecaLinea
}
