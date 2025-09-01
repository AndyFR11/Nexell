import Sidebar from "@/components/wow/sidebar";
import { CampaignsConfig, ISectionConfig, ISections } from "@/lib/campaign.config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface WowLayoutProps extends React.HTMLAttributes<HTMLDivElement> { }

export default async function WowLayout({ children }: WowLayoutProps) {
    const supabase = await createSupabaseServerClient();
    
    // Get the roles of the user
    const response_roles = await supabase.from('roles').select();
    const roles: string[] = (response_roles && response_roles.data) ? [...new Set(response_roles.data.map((item) => item.role))] : [];
    let default_opt: undefined | ISectionConfig = undefined; 
    const options: ISections = Object.entries(CampaignsConfig['WOW'].sections_obj).reduce((prev: any, [key, value], index) => {
        if(!prev[key]) {
            // Verify if the user has one or more roles allowed for the specific section
            const roles_allowed = value.roles;
            const role_found: string[] = roles_allowed.filter((rol_allowed) => roles.find(rol => rol == rol_allowed))
            if (role_found.length > 0) {
                prev[key] = value;
                
                if (!default_opt) {
                    default_opt = value;
                }
            }
        }
        return prev;
    }, {}) 
    
    console.log(options);


    return (
        <div className="flex flex-row w-full h-full">
            {
                (options && default_opt) ? (
                    <>
                        <Sidebar className="h-full"
                            options={options}
                            default_opt={default_opt}
                        ></Sidebar>
                        <div className="flex flex-col gap-2">
                            <div>
                                {children}
                            </div>
                        </div>
                    </>
                ) : (
                  <>
                    <div>No tienes permisos para ninguna accion aqui</div>
                  </>  
                )
            }
        </div>
    )
}
