import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouterEdge } from '~/server/trpc/trpc.router-edge';
import { createTRPCFetchContext } from '~/server/trpc/trpc.server';

const handlerEdgeRoutes = (req: Request) => fetchRequestHandler({
  endpoint: '/api/edge',
  router: appRouterEdge,
  req,
  createContext: createTRPCFetchContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error }) => console.error(`❌ tRPC-edge failed on ${path ?? 'unk-path'}: ${error.message}`)
      : undefined,
});

export const runtime = 'edge';
export { handlerEdgeRoutes as GET, handlerEdgeRoutes as POST };