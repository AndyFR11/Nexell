'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

type SidebarButtonProps = {
  icon: ReactElement;
  label: string;
  href: string;
};

export default function SidebarButton({ icon, label, href }: SidebarButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-center gap-2 hover:bg-gray-600 px-2 py-1 rounded w-full text-sm text-left"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
