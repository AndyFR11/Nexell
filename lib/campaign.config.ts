
export interface ISectionConfig {
    label: string;
    path: string;
    roles: string[];
    icon: any;
}
export interface ISections {
    [key: string]: ISectionConfig
}

export interface ICampaignConfig {
    
    label: string;
    full_path: string;
    single_path: string;
    module: string, 
    sections_obj: ISections, 
    sections_list: {
        label: string;
        path: string;
        roles: string[];
        icon: any;
    }[];
}

export interface ICampaigns {
    [key: string]: ICampaignConfig
}

export const CampaignsConfig: ICampaigns = {
    WOW: {
        label: "wow",
        full_path: "app/wow",
        single_path: "wow",
        module: 'WOW',
        sections_obj: {
            home: {
                label: "Inicio",
                path: "/app/wow/home",
                roles: ["WOW_SELLER", "WOW_DESK", "WOW_ADMIN"],
                icon: "📈",
            },
            finder: {
                label: "Finder",
                path: "/app/wow/finder",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            sales: {
                label: "Sales",
                path: "/app/wow/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            desk: {
                label: "Desk",
                path: "/app/wow/desk",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "💼",
            },
            dashboard: {
                label: "Dashboard",
                path: "/app/wow/dashboard",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "📊",
            }
        },
        sections_list: [
            {
                label: "Finder",
                path: "/app/wow/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            {
                label: "Sales",
                path: "/app/wow/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            {
                label: "Desk",
                path: "/app/wow/desk",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "💼",
            },
            {
                label: "Dashboard",
                path: "/app/wow/dashboard",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "📊",
            },
        ],
    },
    ENTEL: {
        label: "entel",
        full_path: "app/entel",
        single_path: "entel",
        module: 'WOW',
        sections_obj: {
            'finder': {
                label: "Finder",
                path: "/app/wow/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            'sales': {
                label: "Sales",
                path: "/app/wow/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            'desk': {
                label: "Desk",
                path: "/app/wow/desk",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "💼",
            },
            'dashboard': {
                label: "Dashboard",
                path: "/app/wow/dashboard",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "📊",
            }
        },
        sections_list: [
            {
                label: "Finder",
                path: "/app/entel/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            {
                label: "Sales",
                path: "/app/entel/sales",
                roles: ["WOW_SELLER", "WOW_ADMIN"],
                icon: "📈",
            },
            {
                label: "Desk",
                path: "/app/entel/desk",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "💼",
            },
            {
                label: "Dashboard",
                path: "/app/entel/dashboard",
                roles: ["WOW_DESK", "WOW_ADMIN"],
                icon: "📊",
            },
        ],
    }
}

