import { Role } from '../../role/role.model';

export function initialRoles() {
  Role.create({
    value: 'USER',
  });

  Role.create({
    value: 'MODERATOR',
  });

  Role.create({
    value: 'ADMIN',
  });
}
