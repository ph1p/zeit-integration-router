import { htm } from '@zeit/integration-utils';
import { HandlerOptionsRouter, Params } from '../types';

export async function Test1(handler: HandlerOptionsRouter, params: Params) {
  return htm`<Box>
    ${
      handler.payload.action === 'notify'
        ? htm`<Notice type="info">Hello!</Notice>`
        : ''
    }

    <B>Path Params:</B> ${params.id}
    <BR/><BR/>
    ${Math.random()}
    <B>test1</B>
    <BR/><BR/>
    <Button action="notify">open notification</Button>
  </Box>`;
}
