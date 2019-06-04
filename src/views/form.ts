import { htm } from '@zeit/integration-utils';
import { HandlerOptionsRouter } from '../types';

export async function Form(handler: HandlerOptionsRouter) {
  const data = handler.payload.clientState.field;

  return htm`<Box>

  ${
    handler.payload.action === 'submit' && data
      ? htm`<Notice type="info">${data}</Notice><BR />`
      : ''
  }

    <B>Form</B><BR /><BR />
    <Input name="field" value=${data || ''} /><BR /><BR />
    <Button action="submit">Submit</Button>
  </Box>`;
}
