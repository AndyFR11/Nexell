import { createSupabaseServerClient } from "@/lib/supabase/server"
import { IProfile } from "@/lib/utils";

export default async function AppPage() {
  const supabase = await createSupabaseServerClient();
  const response_profile = await supabase.from('profiles').select();
  
  // Get the first profile if not exist keep undefined
  const profile: Partial<IProfile> | undefined = (response_profile.data && response_profile.data.length >= 1) ? response_profile.data[0] : {};

  
  return (
    <div>
      <div> 
        Bienvenido a Nexell <b className="font-bold text-gray-500">{(profile && profile.name) ?? 'Anonimo 👀'}</b>
      </div>
      <div>
        {
          profile ? ( // If the profile exist
            <>
              <div>
                <div>Nombre: {profile.name}</div>
                <div>Apellido: {profile.last_name}</div>
                <div>Bio: {profile.bio}</div>
              </div>
            </>
          ) : ( // If the profile does not exist
            <>
              <div>No tienes perfil</div>
            </>
          )
        }
      </div>
    </div>
  )


}
