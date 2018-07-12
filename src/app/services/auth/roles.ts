export enum Role {
  Unauthorized,
  User,
  Manager,
  Admin,
}

export function determineRole(input: string): Role {
  if (input === 'USER') {
    return Role.User;
  } else if (input === 'ADMIN') {
    return Role.Admin;
  } else if (input === 'MANAGER') {
    return Role.Manager;
  } else {
    return Role.Unauthorized;
  }
}

export function getAllRoles(): string[] {
  const roles: string[] = Object.keys(Role);
  return roles.slice(roles.length / 2);
}
