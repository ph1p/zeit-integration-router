import { htm } from '@zeit/integration-utils';
import { HandlerOptions } from '../../types';

export async function Form({ handler = <HandlerOptions>{} }) {
  const data = handler.payload.clientState.field;

  return htm`
    <Box>
      ${handler.payload.action === 'submit' && data
        ? htm`<Notice type="info">${data}</Notice><BR />`
        : ''}

      <b>Form</b><br /><br />
      <input name="field" value=${data || ''} /><br /><br />
      <button action="submit">Submit</button>
    </Box>
  `;
}
