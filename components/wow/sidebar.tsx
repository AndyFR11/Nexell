'use client'
import * as React from 'react';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuIndicator } from '@radix-ui/react-navigation-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search, ShoppingCart, LayoutDashboard, Link, LampDesk, HomeIcon, } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ISectionConfig, ISections } from '@/lib/campaign.config';

const sidebarVariants = cva(
    "flex flex-col transition-all",
    {
        variants: {
            variant: {
                default: "bg-gray-800 text-white shadow-lg",
                outline: "bg-white text-black border border-gray-300 shadow-sm",
                subtle: "bg-gray-700 text-gray-300 shadow-sm",
                transparent: "bg-transparent text-gray-700",
                accent: "bg-blue-600 text-white shadow-xl",
            },
            size: {
                default: "w-48",
                sm: "w-32",
                lg: "w-64",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const option_icons: {[key: string]: any} = {
    home: (<HomeIcon size={20} />),
    finder: (<Search size={20} />),
    sales: (<ShoppingCart size={20} />),
    desk: (<LampDesk size={20} />),
    dashboard: (<LayoutDashboard size={20} />),
    default: (<Search size={20}></Search>)
}

export interface SidebarProps extends VariantProps<typeof sidebarVariants>, React.HTMLAttributes<HTMLDivElement> {
    options: ISections,
    default_opt: ISectionConfig
}

export default function Sidebar({ className, variant, size, options, default_opt }: SidebarProps) {
    const router = useRouter();
    const handleSelect = (path: string) => {
        router.push(path);
    }
    return (
        <div className={cn(sidebarVariants({ variant, size }), className)}>
            <NavigationMenu orientation="vertical" className="">
                <NavigationMenuList>
                    {
                        Object.entries(options).map(([key, value], index) => (
                            <NavigationMenuItem key={index} className='items-center button-sidebar' onClick={() => {handleSelect(value.path)}}>
                                {option_icons[key] ? option_icons[key] : option_icons['default']}
                                {value.label}
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>

                <NavigationMenuIndicator className="indicator" />
            </NavigationMenu>
        </div>
    );
}
