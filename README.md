# myteepi

MyTeepi API client. See MyTeepi product [here](https://www.myteepi.fr/).

## Usage

Add `myteepi` to your dependencies:

```bash
# using npm
npm i myteepi
# using yarn
yarn add myteepi
```

Use it in your project:

```js
import MyTeepi from "myteepi";

const api = new MyTeepi("my-teepi-username", "my-teepi-password");
api.getDevices();
```

## License

[MIT](https://oss.ninja/mit/dramloc)
