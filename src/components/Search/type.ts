import { PickKeyWithType } from '../type';

export type SearchProp<T> = {
  items: T[];
  field: PickKeyWithType<T, string> | string;
  onChange: (results: T[], searchVal: string) => void;
  /** Search place holder */
  searchPlaceholder?: string;
};
