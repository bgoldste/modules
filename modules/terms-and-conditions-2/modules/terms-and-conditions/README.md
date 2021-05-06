# Terms & Conditions Screen

The Terms and Conditions Screen is a React Native based screen that renders terms and conditions with a simple header.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import TermsAndConditions from "@modules/terms-and-conditions";

const { title, navigator } = TermsAndConditions;
```

## Configuring the Terms & Conditions Frontend
All that is required to configure the frontend is to edit the url in `index.js` to point to your app's url on the web. On line 14 of `index.js`, replace <APP_URL_HERE> with your App's url (you can get this from the crowdbotics dashboard).
`fetch('https://<APP_URL_HERE>.botics.co/modules/terms/termsandconditions/')`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)