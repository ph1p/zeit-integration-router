import { htm } from '@zeit/integration-utils';
import { HandlerOptionsRouter, Params } from '../types';

export async function Parameter(handler: HandlerOptionsRouter, params: Params) {
  return htm`<Box>
    ${
      handler.payload.action === 'notify'
        ? htm`<Notice type="info">Hello!</Notice>`
        : ''
    }

    <B>Path Params:</B> ${params.id}
    <BR/><BR/>
    Random Number: ${Math.random()}
    <BR/><BR/>
    <Button action="notify">open Notification</Button>
  </Box>`;
}
