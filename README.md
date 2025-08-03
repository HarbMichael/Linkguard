# Linkguard
An experimental JavaScript to protect your links from scraping and spambots.

## Description

Linkguard is a lightweight tool designed to protect sensitive links (like download links and email addresses) from being scraped by bots. Instead of displaying links directly, Linkguard uses a JavaScript function that loads an encrypted version of the link, password, and salt from separate files. 

To decrypt the link, the password and salt are used to derive a key using **Argon2id**, a modern hashing algorithm. 

**Important**: The password and salt used are **not designed to be a security feature**, but rather to deter bots and scrapers from easily crawling your website. This approach is meant to protect links like download links or email addresses — **not links you want to be indexed by search engines**.

Linkguard serves as an alternative to CAPTCHA systems, offering an unobtrusive way to protect links while still providing them to legitimate users.

## Features
- Protects links from scraping and bots.
- Uses Argon2id to derive a key for encryption.
- Allows easy link creation and encryption via a simple setup interface.
- Generates random password and salt for each link.
- Can be used to protect email addresses, download links, or other sensitive URLs.

## How to Use

1. Open `setup.html` in your browser.
2. Enter your links and corresponding link texts in the provided text area. Use the format: `[link] [linktext]`.
3. Configure the Argon2id settings such as iterations, memory, and parallelism to customize the key derivation process.
4. Click **Generate links and encrypted files** to create the encrypted links and associated files.
5. A ZIP file containing the encrypted links, passwords, salts, and settings will be generated and ready for download.
6. Include the `linkguard.js` file in your site (e.g., `<script src="path/to/linkguard.js"></script>`).
7. Upload the content of the ZIP file to the root directory of your website.
8. Replace all sensitive links with the links shown in the setup.html.
9. Optional: Add `target="_blank"` in your `<a>` HTML tags if you want the links to open in a new tab.
   
### Example Usage

After generating the links and downloading the ZIP file, you can include the generated JavaScript code to display the protected links on your website.

```html
<a href="javascript:void(0)" onclick="decryptLink('link_1', event)" target="_blank">Click to open the link</a>
```

### Dependencies

- **[Argon2 Browser](https://github.com/antelle/argon2-browser)**: A JavaScript implementation of the Argon2 hashing algorithm.
  - CDN Link: [https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js](https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js)
  - License: MIT License
  - Developer: [Antelle](https://antelle.net/)

- **[Crypto-JS](https://github.com/brix/crypto-js)**: A library of standard cryptographic algorithms.
  - CDN Link: [https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js)
  - License: MIT License
  - Developer: [Brix](https://github.com/brix)

- **[JSZip](https://github.com/Stuk/jszip)**: A JavaScript library for creating, editing, and extracting ZIP files.
  - CDN Link: [https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js](https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js)
  - License: MIT License
  - Developer: [Stuk](https://stuk.github.io/jszip/)

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

## Known Issues

- The encryption may not work in some older browsers.
- Currently, only basic URLs (http, https, mailto) are supported.

## Acknowledgments

Special thanks to the developers of [Argon2Browser](https://github.com/antelle/argon2-browser), [Crypto-JS](https://github.com/brix/crypto-js), and [JSZip](https://github.com/Stuk/jszip) for their excellent libraries!
