import roleCommon from 'assets/base64/role';
import noRoleCommon from 'assets/base64/noRole';

export const Avatar: Record<string, string> = {
  'HAMSTERPASS-1': require('assets/images/me-avatar.png').default.src,
  NONE: require('assets/images/me-avatar.png').default.src,
};

export const RoleImg: Record<string, string> = {
  'HAMSTERPASS-1': roleCommon,
  NONE: noRoleCommon,
};

export const DEFAULT_SYMBOL = 'NONE';
