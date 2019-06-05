import { htm } from '@zeit/integration-utils';

export async function JumpToHome() {
  return htm`<Box>
    <B>Jump to Home</B>

    <Button action="/">jump to home</Button>
  </Box>`;
}
