/**
 * Get key của Base trong đó có property là Condition
 * ```
 * interface Demo {
 *  id: string;
 *  title: string;
 *  x: number;
 *  y: number;
 * }
 * PickKeyWithType<Demo, string>
 * -> return "id" | "title"
 * ```
 * https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
 */
export type PickKeyWithType<Base, Condition> = FilterFlagsKey<Base, Condition>[keyof Base];

type FilterFlagsKey<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

export type TAnyObject = Record<string, unknown>[0];
