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

export enum OrderDeliveryTypeEnum {
  Delivery = 1,
  Pickup,
};

export enum OrderDeliveryTimeTypeEnum {
  Asap = 1,
  Date,
};