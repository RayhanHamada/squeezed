import {
  GenerateAuthenticatedUUIDBody,
  GenerateAuthenticatedUUIDResponse,
} from '@/lib/api-typings';
import { dayjs } from '@/lib/dayjs';
import { admin } from '@/lib/firebase-admin';
import { URLData } from '@/lib/model-types';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateAuthenticatedUUIDResponse>
) {
  const { uid, title, ref_url, enabled, expire_at } =
    req.body as GenerateAuthenticatedUUIDBody;

  const generated: string = nanoid(16);
  const now = dayjs.utc().unix();
  const utcExpiredAt = expire_at
    ? dayjs.utc().add(expire_at, 'hours').unix()
    : null;

  await admin
    .firestore()
    .collection('url_data')
    .add({
      uid,
      enabled,
      ref_url,
      title,
      uuid_code: generated,
      created_at: now,
      last_modified_at: now,
      expire_at: utcExpiredAt,
    } as URLData)
    .then(() => {
      res.status(200).json({
        uuid_code: generated,
      } as GenerateAuthenticatedUUIDResponse);
    })
    .catch(() => {
      res.status(500).json({
        error_msg: 'failed to create url data',
      } as GenerateAuthenticatedUUIDResponse);
    });
}
