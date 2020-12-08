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
  Pickup = 1,
  Delivery,
};