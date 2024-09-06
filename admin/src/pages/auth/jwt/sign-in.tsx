import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CenteredSignInView } from 'src/sections/auth/jwt/centered-sign-in-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CenteredSignInView />
    </>
  );
}
