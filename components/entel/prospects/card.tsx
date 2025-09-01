'use client'
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  EyeOpenIcon,
  PersonIcon,
  FilePlusIcon,
  ImageIcon,
} from '@radix-ui/react-icons';
import { BuildingIcon } from 'lucide-react';
import { IdCardIcon } from 'lucide-react'

export type ProspectCardProps = {
    id: string,
    data: any,
    stage: string
}

export function ProspectCard({ id, data, stage }: ProspectCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="shadow hover:shadow-lg mb-3 border-2 border-purple-500/40 rounded transition-all"
    >
      <div className="flex justify-between items-start bg-purple-500/25 mb-2 p-2 border-b-2 border-b-purple-500/40">
        <div className="flex items-center gap-1 font-bold">
          <BuildingIcon className="text-gray-100" />
          {data.company}
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-100 hover:text-black">
            <EyeOpenIcon />
          </button>
          <button className="text-gray-100 hover:text-black">
            <IdCardIcon />
          </button>
        </div>
      </div>

      <div className="p-2 text-gray-100 text-sm">
        <p><strong>RUC:</strong> {data.ruc}</p>
        <p><strong>Razón Social:</strong> {data.razonSocial}</p>
      </div>

      {(stage === 'PROSPECTOS' || stage === 'NEGOCIACION' || stage === 'CERRADO') && (
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-2">
            <button className="text-gray-100 hover:text-black">
              <PersonIcon />
            </button>
            <button className="text-gray-100 hover:text-black">
              <FilePlusIcon />
            </button>
            <button className="text-gray-100 hover:text-black">
              <ImageIcon />
            </button>
          </div>
          <span className="bg-yellow-300 px-2 py-1 rounded font-semibold text-xs">
            S/. {data.monto}
          </span>
        </div>
      )}
    </div>
  );
}
