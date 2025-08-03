// Function to load the script
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function() {
        console.log(`Skript ${url} erfolgreich geladen.`);
        if (callback) callback();
    };
    script.onerror = function() {
        console.error(`Fehler beim Laden des Skripts: ${url}`);
    };
    document.head.appendChild(script);
}

// Load Crypto-JS and Argon2 Browser
loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js', function() {
    loadScript('https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js', function() {
        // Scripts loaded and ready to start decryption
        console.log('Scripts loaded and ready to start decryptions!');
    });
});

function decryptLink(linkId, event) {
    event.preventDefault(); // Prevend standard behaviour of the links

    const settingsFile = './linkguard/settings.json';
    const encFile = `./linkguard/enc/${linkId}.aes`;
    const pwdFile = `./linkguard/pwd/${linkId}.pwd`;
    const saltFile = `./linkguard/salt/${linkId}.salt`;

    fetch(settingsFile)
        .then(response => response.json())
        .then(settings => {
            // Change linktext to the text in the settings.json
            const linkElement = event.target;
            const originalText = linkElement.innerText;
            linkElement.innerText = settings.decrypting;

            fetch(encFile)
                .then(response => response.text())
                .then(encryptedHref => {
                    fetch(pwdFile)
                        .then(response => response.text())
                        .then(password => {
                            fetch(saltFile)
                                .then(response => response.text())
                                .then(salt => {
                                    // Use argon2id to calculate the key
                                    argon2.hash({
                                        pass: password,
                                        salt: salt,
                                        time: settings.time,
                                        mem: settings.mem,
                                        parallelism: settings.parallelism,
                                        hashLen: 32
                                    }).then(derivedKey => {
                                        const keyBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(derivedKey.hash));
                                        const decryptedHref = CryptoJS.AES.decrypt(encryptedHref, keyBase64).toString(CryptoJS.enc.Utf8);

                                        // Open decrypted link
                                        const target = linkElement.getAttribute('target');
                                        if (target === '_blank') {
                                            window.open(decryptedHref, '_blank');
                                        } else {
                                            window.location.href = decryptedHref;
                                        }

                                        // Reset linktext to original
                                        linkElement.innerText = originalText;
                                    }).catch(error => {
                                        console.error('Error in keycalculation:', error);
                                        linkElement.innerText = 'Decryption error';
                                    });
                                });
                        });
                });
        })
        .catch(error => {
            console.error('Error while loading files:', error);
            const linkElement = event.target;
            linkElement.innerText = 'Decryption Error';
        });
}
