import TopMenu from "@/components/top-menu";
import { IProfile } from "@/lib/utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CampaignsConfig, ICampaignConfig } from "@/lib/campaign.config";
import Sidebar from "@/components/ui/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createSupabaseServerClient();

  // Get the profile of the current user
  const response_profile  = await supabase.from('profiles').select();
  const profile: Partial<IProfile> = (response_profile.data && response_profile.data.length >= 1) ? response_profile.data[0] : {}

  // Get the modules allowed for the user
  const { error: error_modules, data: data_modules } = await supabase.from('modules').select();
  
  // Get the modules information for which the user has access
  // let module_options: Partial<ICampaigns> = {}; 
  let module_roles_by_module: Record<string, any> = {}
  // let default_module: undefined | ICampaignConfig = undefined; 
  
  // We get the roles by each module access
  if (data_modules) {
    for await(const module_conf of data_modules as { id: number, created_at: Date, module: string }[]) {
      const module_name = String(module_conf.module).toLowerCase()
      const { error, data } = await supabase.from(`${module_name}-access`).select('*');
      if(!error && data.length > 0) {
        if (!module_roles_by_module[module_name]) {
          module_roles_by_module[module_name] = {
            module: module_name,
            roles: data[0].roles
          };
        }

        console.log(data)
      }
    }
    console.log(module_roles_by_module);

    // module_roles_by_module = response_modules.data.reduce((prev: any, current: { module: string }, index: number) => {
    //   if (!prev[current.module] && CampaignsConfig[current.module]) {
    //     prev[current.module] = CampaignsConfig[current.module];
        
    //     // if (!default_module) {
    //     //   default_module = CampaignsConfig[current.module]
    //     // }
    //   }
    //   return prev;
    // }, {})
  }


  return (
    <main className="flex flex-col h-screen">
      {
        (profile) ? (
          <>
            <TopMenu
              user={{username: profile.name, alias: profile.alias, photo_url: profile.avatar}}
            ></TopMenu>
          </>
        ): (
          <>
            <div>
              No tienes ningun perfil definido
            </div>
          </>
        )
      }
      <div className="w-20">
        {
          (module_roles_by_module) ? (
            <Sidebar options={module_roles_by_module}>

            </Sidebar>
          ) : (
            <>
            </>
          )
        }
        {children}
      </div>
    </main>
  )
}
