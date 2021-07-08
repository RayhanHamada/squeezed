import { dayjs } from '@/lib/dayjs';
import { admin } from '@/lib/firebase-admin';
import { URLData } from '@/lib/model-types';
import { GenerateAuthenticatedUUIDBody } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import short from 'short-uuid';

type Data = {
  error_msg?: string;
  uuid_code?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { uid, title, ref_url, enabled, expire_at } =
    req.body as GenerateAuthenticatedUUIDBody;

  const generated: string = short.generate();
  const now = dayjs.utc().unix();
  const utcExpiredAt = dayjs.utc(expire_at).unix();

  await admin
    .firestore()
    .collection('url_data')
    .add({
      uid,
      enabled,
      ref_url,
      url_name: title ?? 'No title',
      uuid_code: generated,
      created_at: now,
      last_modified_at: now,
      expire_at: utcExpiredAt,
    } as URLData)
    .then(() => {
      res.status(200).json({
        uuid_code: generated,
      });
    })
    .catch(() => {
      res.status(500).json({
        error_msg: 'failed to create url data',
      });
    });
}
