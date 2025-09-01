import { IResponse } from "@/lib/backend/utils";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Request assign an specifig business business information element to a current user 
 * @returns 
 */
export async function POST(req:NextRequest, { params }: { params: Promise<{id: string}> }) {
    try {
        const { id } = await params;

        const admin_client = createSupabaseAdminClient();
        const { error: error_base, data: data_base } = await admin_client.from('base').select().eq('ruc', id);
        
        // Validate if not error getting a business information element
        if(error_base) {
            const response: IResponse =  {
                ok: false,
                message: {
                    es: 'Error buscando la empresa en la base de informacion'
                },
                error: error_base
            }
            return Response.json(JSON.stringify(response), {status: 400})
        }
        // Validate if still exist business information to be used
        if (!data_base || data_base.length <= 0) {
            const response: IResponse =  {
                ok: false,
                message: {
                    es: 'La empresa que se quiere assignar no fue encontrada'
                },
            }
            return Response.json(JSON.stringify(response), {status: 400})
        }

        const client = await createSupabaseServerClient();
        const { data: { user }, error: error_user } = await client.auth.getUser();
        
        // Validate if not error getting user information
        if (error_user) {
            const response: IResponse =  {
                ok: false,
                message: {
                    es: 'Error en el servidor obteniendo informacion del usuario'
                },
                error: error_user
            }
            return Response.json(JSON.stringify(response), {status: 500})
        }
        // Validate if user was found
        if (!user || !user.id) {
            const response: IResponse =  {
                ok: false,
                message: {
                    es: 'El usuario no fue encontrado'
                },
                error: 'Failed to get user information'
            }
            return NextResponse.json(JSON.stringify(response), { status: 400 });
        }
        
        // Update the state of consulted business information element
        const business_updated = await admin_client.from('base').update({owner_user_id: user.id}).eq('id', data_base[0].id).select()
        const response: IResponse =  {
            ok: true,
            data: business_updated,
            message: {
                es: 'La empresa fue asignada correctamente'
            },
        }
        return NextResponse.json(JSON.stringify(response), { status: 200 });
        
    } catch (error) {
        const response: IResponse =  {
            ok: false,
            message: {
                es: 'Error en el servidor'
            },
            error: error
        }
        return NextResponse.json(JSON.stringify(response), { status: 400 });
    }
}

