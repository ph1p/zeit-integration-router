import { withUiHook, htm } from '@zeit/integration-utils';
import { createRouter } from './libs/router';
import { HandlerOptionsRouter } from './types';

import { Home, Test1, Test2, Test3 } from './views';

const { initRouter, addRoute } = createRouter();

addRoute('/', Home);
addRoute('/test/:id', Test1);
addRoute('/test2', Test2);
addRoute('/test3', Test3);

const uiHook = withUiHook(async (handler: HandlerOptionsRouter) => {
  await initRouter(handler, '/test3', true);

  const {
    payload: { action },
    router: { navigate, Routes }
  } = handler;

  if (action === 'home') {
    await navigate('/');
  }
  if (action === 'test1') {
    await navigate('/test/4f96e758-8640-11e9-bc42-526af7764f64');
  }
  if (action === 'test2') {
    await navigate('/test2');
  }
  if (action === 'test3') {
    await navigate('/test3');
  }
  if (action === 'fail') {
    await navigate('/fail');
  }

  const Page = async (Route: any, currentRoute: string) => htm`<Page>
    <Box display="grid" gridTemplateColumns="100px 1fr" gridGap="15px">
      <Box backgroundColor="white" borderRadius="5px" border="1px solid #ddd" padding="15px">
        <Button action="home" small highlight>home</Button><BR />
        <Button action="test1" small highlight>test1</Button><BR />
        <Button action="test2" small highlight>test2</Button><BR />
        <Button action="test3" small highlight>test3</Button>
        <Button action="fail" small warning>fail</Button>
      </Box>
      <Box backgroundColor="white" borderRadius="5px" border="1px solid #ddd" padding="15px">
        ${await Route}
      </Box>
      <Box backgroundColor="white" gridColumn="1 / span 2" borderRadius="5px" border="1px solid #ddd" padding="15px">
        Your are here: <B>${currentRoute}</B>
      </Box>
    </Box>
  </Page>`;

  return Routes(Page);
});

export default uiHook;
