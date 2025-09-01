'use client'
import { LogOutIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import * as React from 'react'

export interface TopMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    // options: Partial<ICampaigns>,
    // default_opt: ICampaignConfig,
    user: Partial<{
        username: string,
        alias: string,
        photo_url: string,
    }>
}

export default function TopMenu({user}: TopMenuProps) {
    // const router = useRouter();
    // const [open, setOpen] = React.useState(false);
    // const [isPending, startTransition] = React.useTransition();
    // const handleSelect = (path: string) => {
    //     setOpen(false); // Close the dropdown
    //     startTransition(() => {
    //     router.push(path);
    //     });
    // };
    return (
        <div className="flex flex-row justify-between items-center gap-2 bg-secondary px-6 py-3 w-screen">
            <div className="flex flex-row gap-8">
                <div className="flex flex-row gap-2">
                    <h1 className="hidden sm:block text-lg">Nexell</h1>
                    <img src={'https://as2.ftcdn.net/v2/jpg/03/75/18/87/1000_F_375188790_E8KKuL2KvjhPQJhKAJ7MDFbo25pQpvQt.jpg'} className="size-8" />
                </div>
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="bg-accent text-sm"
                        >
                            {default_opt.label}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            Object.entries(options).map(([key, value], index) =>
                                <DropdownMenuItem
                                    key={index}
                                    onSelect={() => {handleSelect(value?.full_path as string)}}
                                >
                                    {value?.label as string}
                                </DropdownMenuItem>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu> */}
                {/* { isPending && <div>Cargando...</div> } */}
            </div>

            <div className="flex flex-row gap-4">
                { user.username && <div>Hello, {user.username}</div> }
                <a
                    href="/auth/login"
                    className="flex flex-row justify-center items-center gap-1 bg-accent px-2 border-2 border-gray-300 rounded text-sm"
                >
                    <LogOutIcon className="w-4" />
                    <p>Salir</p>
                </a>
            </div>
        </div>
    )
}

