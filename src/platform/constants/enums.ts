export enum LanguageEnum {
  Armenian = "hy",
  Russian = "ru",
  English = "en",
}

export enum OSTypeEnum {
  Android = 1,
  iOS,
  Web,
};

export enum NotificationTypeEnum {
  PrescriptionDeciphered = 3,
  PrescriptionCanceled,
  NewReminder,
  NewCustom,
  OrderCollected,
  OrderStarted,
  OrderFinished,
  OrderCanceled,
};

export enum NotificationChoiceTypeEnum {
  UserConfirmed = 1,
  UserCanceled,
};

export enum CardTypeEnum {
  MasterCard = 1,
  Visa,
  AmericanExpress,
  DinnersClub,
  Unknown,
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
export enum PaymentTypeEnum {
  Cash,
  IPay,
  PostTerminal,
  Idram,
  Telcell
}
export enum PromotionTypeEnum {
  Bonus,
  Discount
}