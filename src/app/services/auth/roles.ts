export enum Role {
  Unauthorized,
  Client,
  Manager,
  Admin,
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

export function getAllRoles(): string[] {
  const roles: string[] = Object.keys(Role);
  return roles.slice(roles.length / 2);
}
