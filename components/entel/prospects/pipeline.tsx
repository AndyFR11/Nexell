'use client'
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { ProspectCard } from './card'; // separaremos las cards para modularidad

const initialData = {
  BASE: [
    {
      id: '1',
      company: 'Empresa A',
      ruc: '10456789012',
      razonSocial: 'Empresa A SAC',
      monto: 2020,
    },
  ],
  PROSPECTOS: [],
  NEGOCIACION: [],
  CERRADO: [],
};

const stages = ['BASE', 'PROSPECTOS', 'NEGOCIACION', 'CERRADO'];

export default function Pipeline() {
  const [pipeline, setPipeline] = useState<any | undefined>(initialData);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const [fromStage, fromIndex] = active.id.split('-');
    const [toStage] = over.id.split('-');

    if (fromStage === toStage) return;

    // RESTRICCIONES
    if (fromStage === 'BASE' && toStage === 'CERRADO') return;
    if (fromStage === 'CERRADO' && toStage !== 'CERRADO') return;

    if(pipeline) {
      const item = pipeline[fromStage].find((_: any, i: any) => `${fromStage}-${i}` === active.id);
      const updatedFrom = pipeline[fromStage].filter((_: any, i: any) => `${fromStage}-${i}` !== active.id);
      const updatedTo = [...pipeline[toStage], item];
  
      setPipeline({
        ...pipeline,
        [fromStage]: updatedFrom,
        [toStage]: updatedTo,
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4 border-2 h-full overflow-x-auto">
        {stages.map((stage) => (
          <div key={stage} className="bg-white/5 shadow-md p-3 border-2 border-white/10 rounded-sm w-64 h-full">
            <h2 className="mb-2 border-b-4 border-b-white/10 font-bold text-lg">{stage}</h2>
            <SortableContext
              items={pipeline[stage].map((_: any, i: any) => `${stage}-${i}`)}
              strategy={verticalListSortingStrategy}
            >
              {pipeline[stage].map((card: any, i: any) => (
                <ProspectCard
                  key={`${stage}-${i}`}
                  id={`${stage}-${i}`}
                  data={card}
                  stage={stage}
                />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
