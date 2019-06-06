import { htm } from '@zeit/integration-utils';
import ZeitRouter from '../libs/router';
import { Home, Parameter, Include, Form, JumpToHome, Login } from './views';
import { HandlerOptions, Router } from '../types';

const app = new ZeitRouter();

app.add('/', Home);
app.add('/parameter/:id', Parameter);
app.add('/include', Include);
app.add('/form', Form);
app.add('/login', Login);
app.add('/jump-to-home', JumpToHome);

let userIsLoggedIn = false;

const uiHook = app.uiHook(async (handler: HandlerOptions, router: Router) => {
  const metadata = await handler.zeitClient.getMetadata();

  const {
    payload: { action }
  } = handler;

  if (action === 'home') {
    await router.navigate('/');
  }

  if (action === 'login') {
    userIsLoggedIn = true;
  }

  if (action === 'logout') {
    userIsLoggedIn = false;
  }

  // redirect if logged in or out
  if (userIsLoggedIn) {
    return htm`
      <Page>
        <Box
          backgroundColor="white"
          borderRadius="5px"
          border="1px solid #ddd"
          padding="15px"
        >
          ${await router.renderRoute('/login')}
        </Box>
      </Page>
    `;
  }

  return htm`
    <Page>
      <Box display="grid" gridTemplateColumns="200px 1fr" gridGap="15px">
        <Box
          backgroundColor="white"
          borderRadius="5px"
          border="1px solid #ddd"
          padding="15px"
          display="grid"
          gridTemplateRows="repeat(6, 35px)"
        >
          <Button action="home" small highlight>home</Button>
          <Button
            action="/parameter/4f96e758-8640-11e9-bc42-526af7764f64"
            small
            highlight
          >
            parameter
          </Button>
          <Button action="/include" small highlight>include</Button>
          <Button action="/form" small highlight>form</Button>
          <Button action="/jump-to-home" small highlight>jump-to-home</Button>
          <Button action="/this-page-does-not-exist" small warning>fail</Button>
        </Box>
        <Box
          backgroundColor="white"
          borderRadius="5px"
          border="1px solid #ddd"
          padding="15px"
        >
          ${await router.currentRoute}
        </Box>
        <Box
          backgroundColor="white"
          gridColumn="1 / span 2"
          borderRadius="5px"
          border="1px solid #ddd"
          padding="15px"
        >
          From router parameter here: <B>${router.currentPath}</B><BR />
          From MetaData: <B>${metadata.currentPath}</B>
        </Box>
      </Box>
    </Page>
  `;
});

export default uiHook;
