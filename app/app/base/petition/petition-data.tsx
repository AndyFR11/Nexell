"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import * as Accordion from "@radix-ui/react-accordion";

type Data = {
  id: number;
  ruc: string;
  created_at: string;
  consulta_ruc: any;
  contactos: any[];
  owner_user_id: string | null;
  lineas: any[];
  checa_linea: any;
  consulted: boolean;
  counter_consults: number;
};

export default function PetitionData() {
  const [data, setData] = React.useState<Data | null>(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/v1/base");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        {data && (
          <Card className="flex items-center">
            <div>{data.consulta_ruc.razon_social}</div>
            <Bookmark />
          </Card>
        )}
        <Button onClick={handleButtonClick}>
          Request Business Information
          <ArrowDownRight />
        </Button>
      </div>
      <div>
        <Badge>{data?.consulta_ruc.estado_contribuyente}</Badge>
        <Badge>{data?.consulta_ruc.condicion_contribuyente}</Badge>
      </div>
      <div className="flex flex-col">
        <Label>RUC: {data?.ruc}</Label>
        <Label>Razón Social: {data?.consulta_ruc.razon_social}</Label>
        <Label>
          Domicilio: {data?.consulta_ruc.domicilio_fiscal.direccion}
        </Label>
      </div>
    </div>
  );
}
