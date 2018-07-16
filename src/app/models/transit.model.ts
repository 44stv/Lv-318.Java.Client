export class Transit {
  id: number;
  name: string;
  categoryId: number;
  routeName: string;
  categoryIconURL: string;
}

// Converts JSON strings to/from your types
export namespace Convert {
  export function toTransit(json: string): Transit {
    return JSON.parse(json);
  }

  export function transitToJson(value: Transit): string {
    return JSON.stringify(value, null, 2);
  }
}
