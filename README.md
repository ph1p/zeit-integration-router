## zeit-integration-router

<p align="center">
  <img src="./assets/kapture.gif">
</p>

## What is this?

This is a small router concept for zeit integrations. It support the basic functionality of a router and some extras like parameters.

**DEMO**: [https://zeit.co/integrations/integration-router](https://zeit.co/integrations/integration-router)

## How to?

The only file you need is `libs/router.ts`. Import it at the top of your entrypoint.

Like this:
```javascript
import app from './libs/router';
```
`libs/router.ts` currently returns a singleton and you can name it as you want. The Routes has 2 Methods.

* The `app.routerUiHook` method wraps `withUiHook` and adds a small `router` object to the `handler` object.
* And the `app.add('path/:param/, YourComponent)`. This method adds a new route.


## `router`-object

#### navigate(path)

* Navigate through a specific route.


#### currentRoute()

* Shows the current route. Returns a promise.


#### renderRoute(path)

* Renders a specific route.


#### currentPath

* Get current path as a string.



### Example:

```javascript
import app from './libs/router';
import { Home, Parameter } from './views';

app.add('/', Home);
app.add('/parameter/:id', Parameter);

// call
const uiHook = app.routerUiHook(async (handler) => {
  const {
    payload: {
      action,
    },
    router: { Routes, navigate }
  } = handler;

  if (action === 'home') {
    navigate('/');
  }
  if (action === 'parameter') {
    navigate('/parameter/4f96e758-8640-11e9-bc42-526af7764f64');
  }

  return htm`<Page>
    <Button action="home" small highlight>home</Button>
    <Button action="parameter" small highlight>parameter</Button>
    <Button action="fail" small warning>fail</Button>

    ${await Routes()}

    Your are here: <B>${app.currentRoute}</B>
  </Page>`;
});

export default uiHook;
```


## Development

Just clone this repository and run:

```bash
yarn install && yarn dev
```

or

```bash
npm install && npm run dev
```

The server starts on port **5005** and refreshes automatically.

[More information](https://zeit.co/docs/integrations/#creating-an-integration/step-2-creating-a-uihook/running-the-uihook-locally)