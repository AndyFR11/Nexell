import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

export interface IOptions {
    [key: string]: {
        path: string;
        title: string;
    };
}

export interface IProfile {
    name: string;
    last_name: string;
    avatar: string;
    bio: string;
    alias: string;
}


// Consulta RUC interfaces

export interface IDirection {
    direccion: string,
    departamento: string,
    provincia: string,
    distrito: string
}

export interface IPremise {
    codigo: string,
    tipo: string,
    actividad_economica: string,
    ubicacion: IDirection,
}

export interface IWorkersDistribution {
    trabajadores: number,
    pensionistas: number,
    prestadores_servicios: number
}

export interface IBusinessInformation {
  id: string;

  razon_social: string;
  nombre_comercial: string;

  tipo_contribuyente: string;
  condicion_contribuyente: string;
  estado_contribuyente: string;

  actividad_exterior: string;

  actividad_economica_principal: {
    actividad_economica_principal_cod: string;
  };

  actividad_economica_secundaria: {
    actividad_economica_secundaria_cod: string;
  };

  domicilio_fiscal: IDirection; // puedes definirlo mejor si tienes la estructura

  trabajadores: Record<string, IWorkersDistribution>;
  trabajadores_actual: IWorkersDistribution;

  sistema_emision_comprobante: string;

  fecha_inicio_actividades: string; // "11/11/2015" -> puedes cambiar a Date si lo parseas
  fecha_inscripcion: string;

//   departamento: string;
//   provincia: string;
//   distrito: string;

  locales: {
    cantidad: number,
    locales: IPremise[]
  }; // sin detalle, asumo objeto

  last_update: Date; // o Date, si lo conviertes
}


// Checa tu linea interfaces

export interface IChecaLineaPhone {
    type: string,
    count: number
}
export interface IChecaLineaOperator {
    company: string,
    count: number,
    lines: IChecaLinea[]
}

export interface IChecaLinea {
    id: string,
    claro: number,
    entel: number,
    telefonica: number,
    bitel: number,
    otros: number,
    last_update: Date,
    data: IChecaLineaOperator[]
}
