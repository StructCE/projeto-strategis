type PendentRequestsCount = {
  pendentRequestsCount: number;
};

type Request = {
  description: string;
  requestDate: Date;
  statusDescription: string | null;
  statusDate: Date | null;
  statusResponsibleId: string | null;
  responsibleId: string;
  status: string;
};

type SerializedRequest = {
  requestDate: Date;
  responsibleName: string;
  statusDate: Date | null;
  statusResponsible: string;
  status: string;
  requestProducts: {
    code: string;
    name: string;
    unit: string;
    requestedQuantity: number;
    releasedQuantity: number;
  }[];
};

export type RequestRouteInterfaces = {
  Request: Request;
  PendentRequestsCount: PendentRequestsCount;
  SerializedRequest: SerializedRequest;
};
