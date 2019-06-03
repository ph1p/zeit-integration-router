import { withUiHook, htm } from '@zeit/integration-utils';
import { createRouter } from './libs/router';
import { HandlerOptionsRouter } from './types';

const { initRouter, addRoute } = createRouter('/');

import Home from './views/home';
import Test1 from './views/test1';
import Test2 from './views/test2';
import Test3 from './views/test3';

addRoute('/', Home);
addRoute('/test/:id', Test1);
addRoute('/test2', Test2);
addRoute('/test3', Test3);

const uiHook = withUiHook(async (handler: HandlerOptionsRouter) => {
  await initRouter(handler);

  const {
    router: { navigate, Routes },
    currentRoute
  } = handler;

  if (handler.payload.action === 'home') {
    navigate('/');
  }
  if (handler.payload.action === 'test1') {
    navigate('/test/4f96e758-8640-11e9-bc42-526af7764f64');
  }
  if (handler.payload.action === 'test2') {
    navigate('/test2');
  }
  if (handler.payload.action === 'test3') {
    navigate('/test3');
  }
  if (handler.payload.action === 'fail') {
    navigate('/fail');
  }

  return htm`<Page>
    <Box display="grid" gridTemplateColumns="100px 1fr" gridGap="15px">
      <Box backgroundColor="white" borderRadius="5px" border="1px solid #ddd" padding="15px">
        <Button action="home" small highlight>home</Button><BR />
        <Button action="test1" small highlight>test1</Button><BR />
        <Button action="test2" small highlight>test2</Button><BR />
        <Button action="test3" small highlight>test3</Button>
        <Button action="fail" small warning>fail</Button>
      </Box>
      <Box backgroundColor="white" borderRadius="5px" border="1px solid #ddd" padding="15px">
        ${await Routes()}
      </Box>
      <Box backgroundColor="white" gridColumn="1 / span 2" borderRadius="5px" border="1px solid #ddd" padding="15px">
        Your are here: <B>${currentRoute}</B>
      </Box>
    </Box>
  </Page>`;
});

export default uiHook;
