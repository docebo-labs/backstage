/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Extension,
  ComponentRef,
  createComponentExtension,
  coreComponentsRefs,
} from '@backstage/frontend-plugin-api';
import { AppComponents } from '@backstage/core-plugin-api';

type ComponentTypes<T = AppComponents> = T[keyof T];

const refs: Record<string, ComponentRef<ComponentTypes>> = {
  Progress: coreComponentsRefs.progress,
  BootErrorPage: coreComponentsRefs.bootErrorPage,
  NotFoundErrorPage: coreComponentsRefs.notFoundErrorPage,
  ErrorBoundaryFallback: coreComponentsRefs.errorBoundaryFallback,
};

/** @public */
export function collectLegacyComponents(components: Partial<AppComponents>) {
  return Object.entries(components).reduce<Extension<unknown>[]>(
    (extensions, [name, component]) => {
      const ref = refs[name];
      return ref
        ? extensions.concat(
            createComponentExtension({
              ref,
              component: { sync: () => component },
            }),
          )
        : extensions;
    },
    [],
  );
}
