export type Unit = {
  id: string;
  name: string;
  abbreviation: string;
  unitsPerPack: number;
};

export type UnitRouteInterfaces = {
  Unit: Unit;
};
