# Article List and Detail

## Setup

To set up the articles module, you only need to make sure that your BASE_URL is set in your global options folder, which is located at `options/options.js`. From there, the module will configure itself to point at the appropriate endpoint, which is the BASE_URL + the module path. If you would like to set a custom path, you can do so by changing the path value in the Articles module file, which is located at `articles/options.js`.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Articles from "@modules/articles";

const { title, navigator, slice } = Articles;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
