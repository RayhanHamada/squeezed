import {
  GenerateAnonUUIDBody,
  GenerateAnonUUIDResponse,
} from '@/lib/api-typings';
import { dayjs } from '@/lib/dayjs';
import { admin } from '@/lib/firebase-admin';
import { URLData } from '@/lib/model-types';
import type { NextApiRequest, NextApiResponse } from 'next';
import short from 'short-uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateAnonUUIDResponse>
) {
  const { ref_url } = req.body as GenerateAnonUUIDBody;
  const generated: string = short.generate();
  const now = dayjs.utc().unix();
  const expire_at = dayjs.utc().add(24, 'hour').unix();

  await admin
    .firestore()
    .collection('url_data')
    .add({
      ref_url,
      expire_at,
      created_at: now,
      last_modified_at: now,
      enabled: true,
      uuid_code: generated,
    } as URLData)
    .then(() => {
      res.status(200).json({
        uuid_code: generated,
      } as GenerateAnonUUIDResponse);
    })
    .catch(() => {
      res.status(500).json({
        error_msg: 'failed to create url data',
      } as GenerateAnonUUIDResponse);
    });
}
