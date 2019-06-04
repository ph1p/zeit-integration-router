## zeit-integration-router

<p align="center">
  <img src="./assets/kapture.gif">
</p>

This is a small router concept for zeit integrations.

**DEMO**: [https://zeit.co/integrations/integration-router](https://zeit.co/integrations/integration-router)

### How to?

The only file you need is `libs/router.ts`. Import it at the top of your entrypoint.
The `app.routerUiHook` method wraps `withUiHook` and adds a small `router` object to the `handler` object.
`app.add('path/:param/, YourComponent)` adds a route.

### `router`-object

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