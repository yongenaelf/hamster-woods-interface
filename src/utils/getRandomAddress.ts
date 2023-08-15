import { randomBytes } from 'crypto';

/**
 * Generate a random address string for testing purposes.
 * @returns random address string
 */
export function getRandomAddress() {
  return `ELF_${randomBytes(20).toString('hex')}_AELF`;
}
