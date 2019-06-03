import { htm } from '@zeit/integration-utils';
import { HandlerOptionsRouter } from '../types';

export default async function RouteView(handler: HandlerOptionsRouter) {
  if (handler.payload.action === 'notify') {
    handler.router.navigate('/');
  }

  return htm`<Box>
    <B>test3</B>
    <Button action="notify">Redirect</Button>
  </Box>`;
};
