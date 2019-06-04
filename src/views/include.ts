import { htm } from '@zeit/integration-utils';
import { HandlerOptionsRouter } from '../types';

export async function Include(handler: HandlerOptionsRouter) {
  return htm`<Box>
    <B>Include</B>

    Include page

    <BR /><BR />
    <BR /><BR />
    <BR /><BR />

    <Box border="1px solid #ddd" padding="20px">
      <H2>I'm page <B>parameter</B></H2>
      ${await handler.router.Route('/parameter/1234')}
    </Box>
  </Box>`;
}