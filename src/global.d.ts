type anyObject<T = any> = {
  [key: string]: T;
}

type genericFunction = {
  (...params: any): any;
}

type ObjectWithKey<K extends string, V = any> = { [P in K]: V };

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
