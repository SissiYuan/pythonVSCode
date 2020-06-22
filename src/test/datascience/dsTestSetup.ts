// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as fs from 'fs-extra';
import * as path from 'path';
import { EXTENSION_ROOT_DIR_FOR_TESTS } from '../constants';
/**
 * Modify package.json to ensure VSC Notebooks have been setup so tests can run.
 * This is required because we modify package.json during runtime, hence we need to do the same thing for tests.
 */

const packageJsonFile = path.join(EXTENSION_ROOT_DIR_FOR_TESTS, 'package.json');
const content = JSON.parse(fs.readFileSync(packageJsonFile).toString());
// tslint:disable-next-line: no-console
console.log(content);
// tslint:disable-next-line: no-console
console.log(JSON.stringify(content));
// This code is temporary.
if (content.contributes.notebookProvider[0].priority !== 'default') {
    content.contributes.notebookProvider[0].priority = 'default';

    // Update package.json to pick experiments from our custom settings.json file.
    content.contributes.configuration.properties['python.experiments.optInto'].scope = 'resource';
    fs.writeFileSync(packageJsonFile, JSON.stringify(content, undefined, 4));
}
