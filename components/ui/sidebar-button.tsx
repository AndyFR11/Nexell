

type SidebarButtonProps = {
  icon: React.ReactElement;
  label: string;
};

export default function SidebarButton({ icon, label }: SidebarButtonProps) {
  return (
    <button className="flex items-center space-x-2 hover:bg-gray-200 px-2 py-1 rounded w-full text-sm">
    {icon}
    <span>{label}</span>
  </button>
  )
};
