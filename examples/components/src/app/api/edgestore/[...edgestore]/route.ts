import { initEdgeStore } from '@edgestore/server';
import {
  createEdgeStoreNextHandler,
  type CreateContextOptions,
} from '@edgestore/server/adapters/next/app';
// import { useSession } from 'next-auth/react'
import { z } from 'zod';

type Context = {
  userId: string;
  userRole: 'admin' | 'user';
};

const inputSchema = z.object({
  type: z.enum(['post', 'profile', 'rdo']),
});

function createContext({ req }: CreateContextOptions): Context {
  // const { data } = useSession()

  // if (!data || !data.user) {
  //   return {
  //     userId: '',
  //     userRole: 'user',
  //   }
  // }

  return {
    userId: '123',
    userRole: 'admin',
  };
}

const es = initEdgeStore.context<Context>().create();

const imageBucketConfig = {
  maxSize: 5 * 1024 * 1024,
  accept: ['image/jpeg', 'image/jpg', 'image/png'],
};

function createMetadata(ctx: Context, input: { type: string }) {
  return {
    userRole: ctx.userRole,
    userId: ctx.userId,
    type: input.type,
  };
}

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket(imageBucketConfig)
    .input(inputSchema)
    .path(({ ctx, input }) => [{ type: input.type }, { owner: ctx.userId }])
    .metadata(({ ctx, input }) => createMetadata(ctx, input)),

  protectedFiles: es
    .fileBucket(imageBucketConfig)
    .input(inputSchema)
    .path(({ ctx, input }) => [{ type: input.type }, { owner: ctx.userId }])
    .metadata(({ ctx, input }) => createMetadata(ctx, input))
    .accessControl({
      OR: [{ userId: { path: 'owner' } }, { userRole: { eq: 'admin' } }],
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
