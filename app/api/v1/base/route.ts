import { NextRequest, NextResponse } from "next/server";
import { GetBusinessSchema } from "@/lib/backend/business.dto";
import { IResponse } from "@/lib/backend/utils";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    try {
        // const payload  = GetBusinessSchema.safeParse(req.body);
        if (false) {
            const response: IResponse = {
                ok: false,
                message: {
                    es: 'No se pudo obtener informacion de la empresa RUC',
                }
            }
            
            return NextResponse.json(response, { status: 200 })
        }

        const supabase = await createClient();
        const data: any =  await supabase.from('base').select().eq('consulted', false).limit(1);
        
        if (data.data.length > 0) {
            await supabase.from('base').update({ consulted: true }).eq('id', data.data[0].id);
            console.log(`${data.data} marked as consulted`);            
            return NextResponse.json(data.data[0], { status: 200 });
        
        } else {
            const response: IResponse = {
                ok: false,
                message: {
                    es: 'No hay informacion disponible'
                },
                error: 'No data found',
            }
            return NextResponse.json(response, { status: 200 });
        }

    } catch (error) {
        const response: IResponse =  {
            ok: false,
            message: {
                es: 'Error getting information'
            },
            error: JSON.stringify(error)
        }
        return NextResponse.json(response, { status: 400 });
    }
}

