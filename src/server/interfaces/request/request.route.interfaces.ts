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
  id: string;
  productId: string;
  code: string;
  name: string;
  ncm: number;
  cfop: number;
  requestedQuantity: number;
  currentStock: number | null;
  minimunStock: number | null;
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
  } | null;
};

export type SerializedRequest = {
  id: string;
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
