// https://angular.io/guide/styleguide#style-04-12

import { ISafeAny } from "@sharedModule/models/ISafeAny";

export function throwIfAlreadyLoaded(parentModule: ISafeAny, moduleName: string): void {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
