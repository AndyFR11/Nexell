import { NextRequest, NextResponse } from "next/server";
import { IResponse } from "@/lib/backend/utils";
import { createSupabaseAdminClient } from "@/lib/supabase/server";


/**
 * 
 * @param req - Reguest a business information element
 * @returns Business information element
 */
export async function GET(req: NextRequest) {
    try {
        const supabase = createSupabaseAdminClient();
        const {error: error_base, data: data_base }  =  await supabase
            .from('base')
            .select()
            .is('owner_user_id', null)
            .order('counter_consults', { ascending: true })
            .limit(1);
        
        if (error_base) {
            const response: IResponse = {
                ok: false,
                message: {
                    es: 'Error obteniendo un elemento'
                },
                error: 'Error getting new business information',
            }
            return NextResponse.json(response, {status: 500 })
        }

        if (data_base && data_base.length > 0) {
            await supabase.from('base').update({ consulted: true }).eq('id', data_base[0].id);
            

            console.log(`${data_base} marked as consulted`);
            return NextResponse.json(data_base[0], { status: 200 });
        } else {
            const response: IResponse = {
                ok: false,
                message: {
                    es: 'Toda la base ya fue assignada'
                },
                error: 'No data found',
            }
            return NextResponse.json(response, { status: 200 });
        }

    } catch (error) {
        const response: IResponse =  {
            ok: false,
            message: {
                es: 'Error de servidor'
            },
            error: error
        }
        return NextResponse.json(response, { status: 400 });
    }
}

