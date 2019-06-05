import { htm } from '@zeit/integration-utils';
import { Route } from '../../types';

export async function Parameter(route: Route) {
  return htm`
    <Box>
      ${route.handler.payload.action === 'notify'
        ? htm`<Notice type="info">Hello!</Notice>`
        : ''}

      <B>Path Params:</B> ${route.params.id} <BR /><BR />
      Random Number: ${Math.random()}
      <BR /><BR />
      <Button action="notify">open Notification</Button>
    </Box>
  `;
}
