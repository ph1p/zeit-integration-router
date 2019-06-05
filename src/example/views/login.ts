import { htm } from '@zeit/integration-utils';

export async function Login() {
  return htm`<Box>
    <B>Horay! You're logged in!</B>

    <Button action="logout">Logout</Button>
  </Box>`;
}