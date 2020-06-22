// const necessaryContextBuilder = <Type, SetterType>(defaultValue: Type) => {
//   type ChangeCallback = (value: SetterType) => void;
//   type ValueArray = [Type, ChangeCallback];

//   return React.createContext<ValueArray>([defaultValue, () => { return; }]);
// };