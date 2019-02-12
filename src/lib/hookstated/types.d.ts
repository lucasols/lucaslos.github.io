type Serializable =
  | boolean
  | number
  | string
  | null
  | SerializableArray
  | SerializableMap;

type SerializableMap = {
  [key: string]: Serializable;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SerializableArray extends Array<Serializable> {}

type State = anyObject<Serializable>;
