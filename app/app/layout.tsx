import TopMenu from "@/components/top-menu";
import { IProfile } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { CampaignsConfig, ICampaigns, ICampaignConfig } from "@/lib/campaign.config";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient();

  // Get the profile of the current user
  const response_profile  = await supabase.from('profiles').select();
  const profile: Partial<IProfile> = (response_profile.data && response_profile.data.length >= 1) ? response_profile.data[0] : {}

  // Get the modules allowed for the user
  const response_modules  = await supabase.from('modules').select();
  
  // Get the modules information for which the user has access
  let modules: Partial<ICampaigns> = {}; 
  let default_module: undefined | ICampaignConfig = undefined; 
  
  if (response_modules.data) {
    modules = response_modules.data.reduce((prev: any, current: { module: string }, index: number) => {
      if (!prev[current.module] && CampaignsConfig[current.module]) {
        prev[current.module] = CampaignsConfig[current.module];
        if (!default_module) {
          default_module = CampaignsConfig[current.module]
        }
      }
      return prev;
    }, {})
  }

  return (
    <main className="flex flex-col h-screen">
      {
        (modules && default_module) ? (
          <>
            <TopMenu
              options={modules}
              default_opt={default_module}
              user={{username: profile.name, alias: profile.alias, photo_url: profile.avatar}}
            ></TopMenu>
            {children}
          </>
        ): (
          <>
          <div>
            No tienes acceso a ningun modulo
          </div>
          </>
        )
      }
    </main>
  )
}
