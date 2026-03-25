import type { Queryable } from "../manager-api";

const notNullOrUndefined = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

const parseAccept = (accept?: string) => {
  return (
    accept
      ?.split(",")
      .map((p) => p.trim())
      .map((i) => i.split(";"))
      .map(([baseType, ...parameters]) =>
        [baseType?.split("/", 2), parameters.map((p) => p.trim())].flat(),
      )
      .map(([type, subtype, ...parameters]) => ({
        type,
        subtype,
        parameters: parameters.filter(notNullOrUndefined),
      })) ?? []
  );
};

// The code here should match the logic in Fabric Go:
// https://github.com/teldio-operations/fabric-go/blob/main/module/queryable/request.go
const matches = (
  provide: { type?: string; subtype?: string },
  accepted: { type?: string; subtype?: string },
) => {
  if (provide.type === "*" || accepted.type === "*") {
    return true;
  }

  if (provide.type !== accepted.type) {
    return false;
  }

  if (
    provide.subtype === "*" ||
    accepted.subtype === "*" ||
    !accepted.subtype
  ) {
    return true;
  }

  if (provide.subtype !== accepted.subtype) {
    return false;
  }

  return true;
};

export const filterQueries = (accept?: string) => {
  const accepts = parseAccept(accept);

  return (q: Queryable) => {
    const provides = parseAccept(q.mediaType);

    for (const accept of accepts) {
      for (const provide of provides) {
        if (matches(provide, accept)) {
          return true;
        }
      }
    }

    return false;
  };
};
