export class ExcategoryModel {
  id: number;
  name: string;
  nextLevelCategory: {
    id: number;
    name: string;
  };
  iconURL: string;
  countOfTransits: number;

}

export namespace Convert {
  export function toExcategoryModel(json: string): ExcategoryModel {
    return JSON.parse(json);
  }

  export function exCategoryToJson(value: ExcategoryModel): string {
    return JSON.stringify(value, null, 2);
  }
}
