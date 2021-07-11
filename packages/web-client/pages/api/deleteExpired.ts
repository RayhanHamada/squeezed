import { isDev } from '@/global';
import { DeleteExpiredResponse } from '@/lib/api-typings';
import { dayjs } from '@/lib/dayjs';
import { admin } from '@/lib/firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const now = dayjs.utc().unix();

  const query = admin
    .firestore()
    .collection('url_data')
    .where('expire_at', '>=', now);

  await query
    .get()
    .then((col) => {
      col.docs.forEach((doc) => {
        doc.ref.delete();
      });

      return col.docs.length;
    })
    .then((much) => {
      res.status(200).json({
        much,
      } as DeleteExpiredResponse);
    })
    .catch((err) => {
      if (isDev) {
        console.log(err);
      }

      res.status(500).json({
        much: 0,
        error_msg: 'failed',
      } as DeleteExpiredResponse);
    });
}
