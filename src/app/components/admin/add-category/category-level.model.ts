export enum CategoryLevel {
  Global,
  City,
  TransportType
}

export function getAllCategoryLevel(): string[] {
  const category: string[] = Object.keys(CategoryLevel);
  return category.slice(category.length / 2);
}
