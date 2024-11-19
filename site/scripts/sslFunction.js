const selfsigned = require('selfsigned');
const fs = require("fs");

/**
 * create an ssl connection and return options value
 * @returns options value
 */
function generateSSL() {
    // Generate a self-signed certificate
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pems = selfsigned.generate(attrs, {
        days: 365, // Valid for 1 year
        keySize: 2048, // RSA key size
        algorithm: 'sha256', // Algorithm used for the certificate
        extensions: [
            { name: 'basicConstraints', cA: true },
            { name: 'keyUsage', keyCertSign: true, digitalSignature: true, keyEncipherment: true },
            {
                name: 'subjectAltName',
                altNames: [
                    { type: 2, value: 'localhost' }, // DNS name for localhost
                    { type: 7, ip: '127.0.0.1' }      // IP address for localhost
                ]
            }
        ],
    });
    // Generate SSL credentials
    const options = {
        // Write the key and cert to files (optional, for persistence)
        key: pems.private,
        cert: pems.cert
    }

    // Write the key and cert to files
    fs.writeFileSync('public/cert/localhost-key.pem', pems.private);
    fs.writeFileSync('public/cert/localhost.pem', pems.cert);

    return options;
};
generateSSL();

module.exports = {};