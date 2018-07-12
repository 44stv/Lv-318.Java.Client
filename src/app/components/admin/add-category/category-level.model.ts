export enum CategoryLevel {
  Global,
  City,
  TransportType
}

export function determineCategory(input: string): CategoryLevel {
  if (input === 'USER') {
    return CategoryLevel.City;
  } else if (input === 'ADMIN') {
    return CategoryLevel.TransportType;
  } else {
    return CategoryLevel.Global;
  }
}

export function getAllCategoryLevel(): string[] {
  const category: string[] = Object.keys(CategoryLevel);
  return category.slice(category.length / 2);
}
