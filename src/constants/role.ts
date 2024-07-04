import roleCommon from 'assets/base64/role';
import noRoleCommon from 'assets/base64/noRole';
import { HAMSTER_PASS } from 'constants/index';

export const Avatar: Record<string, string> = {
  [HAMSTER_PASS.symbol]: require('assets/images/me-avatar.png').default.src,
  NONE: require('assets/images/me-avatar.png').default.src,
};

export const RoleImg: Record<string, string> = {
  [HAMSTER_PASS.symbol]: roleCommon,
  NONE: noRoleCommon,
};

export const DEFAULT_SYMBOL = 'NONE';
