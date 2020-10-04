export type TSearchRequired = { title: string };

type FilterFlagsKey<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
};


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