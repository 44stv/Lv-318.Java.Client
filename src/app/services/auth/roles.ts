export enum Role {
  Unauthorized,
  Client,
  Admin
}

export function determineRole(input: string): Role {
  if (input === 'USER') {
    return Role.Client;
  } else if (input === 'ADMIN') {
    return Role.Admin;
  } else {
    return Role.Unauthorized;
  }
}
