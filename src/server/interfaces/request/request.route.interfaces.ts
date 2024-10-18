export type PendentRequestsCount = {
  pendentRequestsCount: number;
};

export type Request = {
  description: string | null;
  requestDate: Date;
  responsibleId: string;
  status: string;
  statusDate: Date | null;
  statusDescription: string | null;
  statusResponsibleId: string | null;
};

export type RequestProduct = {
  code: string;
  name: string;
  // unit: string;
  requestedQuantity: number;
  currentStock: number;
  minimunStock: number;
  releasedQuantity: number | null;
  shelf: {
    id: string;
    name: string;
    cabinet: {
      id: string;
      name: string;
      StockCabinet: {
        stock: {
          id: string;
          name: string;
          companyId: string;
          legalResponsibleId: string;
        };
      }[];
    };
  };
};

export type SerializedRequest = {
  description: string | undefined | null;
  requestDate: Date;
  responsibleName: string | undefined;
  status: string;
  statusDate: Date | null;
  statusDescription: string | null;
  statusResponsible: string | undefined;
  requestProducts: RequestProduct[];
};

export type RequestRouteInterfaces = {
  Request: Request;
  PendentRequestsCount: PendentRequestsCount;
  SerializedRequest: SerializedRequest;
};
