import detectProvider from '@portkey/detect-provider';
import { IPortkeyProvider } from '@portkey/provider-types';

export default class DetectProvider {
  private static instance: IPortkeyProvider | null = null;

  static async get() {
    if (!DetectProvider.instance) {
      DetectProvider.instance = await detectProvider();
    }
    return DetectProvider.instance;
  }
}
