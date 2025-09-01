import * as Accordion from "@radix-ui/react-accordion";
import { BellIcon, HomeIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

// export type ISidebarIcons = Record<
//   string,
//   {
//     icon?: React.ReactElement;
//     svg?: string;
//     png?: string
//   }
// >;
// export const SidebarIcons: ISidebarIcons = {
//     wow: {},
//     entel: {}
// }

export type ISidebarProps = {
  options: Record<
    string,
    {
      module: string;
      roles: string[];
    }
  >;
};

export default function Sidebar({ options }: ISidebarProps) {
  return (
    <aside className="p-4 border-r w-64 h-screen">
      <Accordion.Root type="multiple" className="space-y-2">
        {options["base"] && (
          <Accordion.Item value="base">
            <Accordion.Header>
              <Accordion.Trigger className="py-2 w-full font-semibold text-left">
                Base de informacion
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="space-y-2 pl-4">
                {options["base"].roles.includes('SELLER') && (
                    <SidebarButton icon={<HomeIcon />} label="Inicio" />
                )}
                {options["base"].roles.includes('SELLER') && (
                    <SidebarButton icon={<BellIcon />} label="Notificaciones" />
                )}
                
            </Accordion.Content>
          </Accordion.Item>
        )}

        {/* Group Wow */}
        <Accordion.Item value="wow">
          <Accordion.Header>
            <Accordion.Trigger className="py-2 w-full font-semibold text-left">
              Configuración
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="space-y-2 pl-4">
            <SidebarButton icon={<HomeIcon />} label="Preferencias" />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </aside>
  );
}
