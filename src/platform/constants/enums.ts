export enum LanguageEnum {
  Armenian = "am",
  Russian = "ru",
  English = "en",
}

export enum OSTypeEnum {
  Android = 1,
  iOS,
  Web,
};

export enum NotificationTypeEnum {
  NewRequest = 1,
  RequestCanceled,
  RequestFailed,
  RequestSucceeded,
  NewOrder,
  OrderCanceled,
  OrderSetToReview,
  OrderFinished,
  WishListNewProduct,
  WishListRemoveProduct,
  WishListApprove,
  WishListUnapprove,
  WishListLeave,
  WishListDelete,
  WishListProductRequest,
  WishListKick,
  WishListNewMember,
};

export enum WeekDaysEnum {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
};