import { IResponse } from "@/lib/backend/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{id: string}> }) {
    try {
        const { id } = await params;
        const response: IResponse =  {
            ok: true,
            message: {
                es: `${id} scraped successfully`,
            },
            data: { id: id }
        }
        return NextResponse.json(JSON.stringify(response), { status: 400 });
    } catch(error) {
        const response: IResponse =  {
            ok: false,
            message: {
                es: 'Error de servidor'
            },
            error: error
        }
        return NextResponse.json(JSON.stringify(response), { status: 400 });
    }
    
}
