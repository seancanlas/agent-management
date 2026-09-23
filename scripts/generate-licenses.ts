"use strict";

import fs from 'fs';
import path from 'path';

export class LicenseGenerator {
  static async generateLicenses(
    outputDir: string = './dist',
    licenseMap: Record<string, string> = {}
  ): Promise<void> {
    console.log('📄 Generating licenses...');
    
    // Create licenses directory
    const licensesDir = path.join(outputDir, 'licenses');
    if (!fs.existsSync(licensesDir)) {
      fs.mkdirSync(licensesDir, { recursive: true });
    }
    
    // Default license mappings
    const defaultLicenseMap = {
      'axios': 'MIT',
      'fs-extra': 'MIT',
      'node-fetch': 'MIT',
      'tar': 'ISC',
      'yaml': 'MIT',
      'yargs': 'MIT',
      '@clack/prompts': 'MIT',
      'prettier': 'MIT',
      'typescript': 'Apache-2.0',
      'vitest': 'MIT',
      ...licenseMap,
    };
    
    // Generate license files
    for (const [packageName, licenseType] of Object.entries(defaultLicenseMap)) {
      const licenseFile = path.join(licensesDir, `${packageName}.license`);
      const licenseContent = this.getLicenseContent(licenseType);
      fs.writeFileSync(licenseFile, licenseContent, 'utf8');
    }
    
    // Generate consolidated license file
    const consolidatedLicense = this.generateConsolidatedLicense(defaultLicenseMap);
    const consolidatedFile = path.join(outputDir, 'LICENSE-3rdparty');
    fs.writeFileSync(consolidatedFile, consolidatedLicense, 'utf8');
    
    console.log(`✅ Licenses generated in: ${licensesDir}`);
  }

  private static getLicenseContent(licenseType: string): string {
    const licenses: Record<string, string> = {
      'MIT': `MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
      'Apache-2.0': `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/ /

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"Contributor" shall mean the copyright owner(s) of the original Author and any
contributors.

"Contributor" includes the author(s) of Contributor(s)' modifications,
including modifications by U.S. Government employees. This license is
intended to apply to all open source software and documentation.

You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,
      'ISC': `ISC License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the software.

THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
      'BSD-3-Clause': `BSD 3-Clause License

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
    };
    
    return licenses[licenseType] || `License for ${packageName} (${licenseType})`; 
  }

  private static generateConsolidatedLicense(licenseMap: Record<string, string>): string {
    let content = 'Third-party Licenses\n';
    content += '======================\n\n';
    
    for (const [packageName, licenseType] of Object.entries(licenseMap)) {
      content += `Package: ${packageName}\n`;
      content += `License: ${licenseType}\n`;
      content += `File: licenses/${packageName}.license\n\n`;
    }
    
    content += '\nFor full license texts, see individual license files in the licenses/ directory.';
    return content;
  }
}

export { LicenseGenerator };