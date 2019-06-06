import { htm } from '@zeit/integration-utils';
import { Router } from '../../types';

export async function Include({ router = <Router>{} }) {
  return htm`
    <Box>
      <B>Include</B>

      Include page

      <BR /><BR />
      <BR /><BR />
      <BR /><BR />

      <Box border="1px solid #ddd" padding="20px">
        <H2>I'm page <B>parameter</B></H2>
        ${await router.renderRoute('/parameter/1234')}
      </Box>
    </Box>
  `;
}
