

export interface WowLayoutProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function SalesLayout({children}: WowLayoutProps) {
    

    return (
        <div>
            {children}
        </div>
    )
}
