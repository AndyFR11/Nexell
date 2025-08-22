import { IResponse } from "@/lib/backend/utils";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const response_employees = await supabase.from('supervisors').select();
        console.log(response_employees.data);
        const employees: string[] = response_employees.data ? response_employees.data.map(item => item.employee_id) : [];
        
        if (employees.length <= 0) {
            const response: IResponse = {
                ok: false,
                message: {
                    es: 'No se encontraron empleados',
                },
                error: 'Subordinates not found',
            } 
            return NextResponse.json(response, { status: 400 });
        }

        return NextResponse.json({data: employees}, { status: 200 });

    } catch (error) {
        const response: IResponse = {
            ok: false,
            message: {
                es: 'No se pudo añadir una nueva venta',
            },
            error: JSON.stringify(error),
        } 
        return NextResponse.json(response, { status: 400 }); 
    }
}

