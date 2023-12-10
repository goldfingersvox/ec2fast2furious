export function urlSearchParamsToObject(params: URLSearchParams): Record<string, string | string[]> {
  const obj: Record<string, string | string[]> = {};
  for (const [key, value] of params) {
    if (!obj[key]) {
      obj[key] = value;
    } else {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).push(value);
      } else {
        obj[key] = [obj[key] as string, value];
      }
    }
  }
  return obj;
}
