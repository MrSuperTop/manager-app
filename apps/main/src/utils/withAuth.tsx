import { NextPage } from 'next';
import { isServer } from './isServer';

export const withAuth = (page: NextPage): NextPage => {
  page.getInitialProps = async (ctx) => {
    if (isServer() && !ctx.req.headers.cookie) {
      ctx.res.statusCode = 302;
      ctx.res.setHeader('Location', `/login`);
  
      return { props: {} };
    }
  }

  return page;
}