export enum OrderStatusEnum {
  Failed,
  Pending,
  AttachedToCarrier,
  ConfirmedByBranchAdmin,
  NotCompleted,
  ReadyToStart,
  Started,
  Delivered,
  Canceled
};

export enum PrescriptionsEnum {
  Pending = 1,
  Delivered,
  Failed
};

export enum OrderDeliveryTypeEnum {
  Delivery = 1,
  Pickup,
};

export enum OrderDeliveryTimeTypeEnum {
  Asap = 1,
  DeliveryDate,
};
