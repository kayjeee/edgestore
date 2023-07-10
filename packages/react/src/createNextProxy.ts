import { AnyEdgeStoreRouter } from '@edge-store/server/core';
import { z } from 'zod';
import EdgeStoreError from './libs/errors/EdgeStoreError';

export type BucketFunctions<TRouter extends AnyEdgeStoreRouter> = {
  [K in keyof TRouter['routes']]: {
    upload: (params: {
      file: File;
      input: z.infer<TRouter['routes'][K]['_def']['input']>;
      onProgressChange?: (progress: number) => void;
    }) => Promise<{
      url: string;
    }>;
  };
};

type OnProgressChangeHandler = (progress: number) => void;

export function createNextProxy<TRouter extends AnyEdgeStoreRouter>({
  apiPath,
}: {
  apiPath: string;
}) {
  return new Proxy<BucketFunctions<TRouter>>({} as BucketFunctions<TRouter>, {
    get(_, prop) {
      const routeName = prop as keyof TRouter['routes'];
      const routeFunctions: BucketFunctions<TRouter>[string] = {
        upload: async (params: {
          file: File;
          input: z.infer<TRouter['routes'][typeof routeName]['_def']['input']>;
          onProgressChange?: OnProgressChangeHandler;
        }) => {
          return await uploadFile(params, {
            routeName: routeName as string,
            apiPath,
          });
        },
      };
      return routeFunctions;
    },
  });
}

async function uploadFile(
  {
    file,
    input,
    onProgressChange,
  }: {
    file: File;
    input: object;
    onProgressChange?: OnProgressChangeHandler;
  },
  {
    apiPath,
    routeName,
  }: {
    apiPath: string;
    routeName: string;
  },
) {
  try {
    const res = await fetch(`${apiPath}/request-upload`, {
      method: 'POST',
      body: JSON.stringify({
        input,
        fileInfo: {
          routeName,
          extension: file.name.split('.').pop(),
          size: file.size,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    if (!json.uploadUrl) {
      throw new EdgeStoreError('An error occurred');
    }
    // Upload the file to the signed URL and get the progress
    await uploadFileInner(file, json.uploadUrl, onProgressChange);
    return { url: json.accessUrl };
  } catch (e) {
    onProgressChange?.(0);
    throw e;
  } finally {
    onProgressChange?.(100);
  }
}

const uploadFileInner = async (
  file: File,
  uploadUrl: string,
  onProgressChange?: OnProgressChangeHandler,
) => {
  const promise = new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('PUT', uploadUrl);
    request.addEventListener('loadstart', () => {
      onProgressChange?.(0);
    });
    request.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        // 2 decimal progress
        const progress = Math.round((e.loaded / e.total) * 10000) / 100;
        onProgressChange?.(progress);
      }
    });
    request.addEventListener('error', () => {
      reject(new Error('Error uploading file'));
    });
    request.addEventListener('abort', () => {
      reject(new Error('File upload aborted'));
    });
    request.addEventListener('loadend', () => {
      resolve();
    });

    request.send(file);
  });
  return promise;
};
