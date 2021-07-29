import { isDev } from '@/global';
import { UpdateUsernameBody, UpdateUsernameResponse } from '@/lib/api-typings';
import { admin } from '@/lib/firebase-admin';
import { UserData } from '@/lib/model-types';
import { NextApiHandler } from 'next';

const updateUsername: NextApiHandler<UpdateUsernameResponse> = async function (
  req,
  res
) {
  const { username, uid } = req.body as UpdateUsernameBody;

  await admin
    .auth()
    .updateUser(uid, { displayName: username })
    .then(async () => {
      await admin
        .firestore()
        .collection('user_data')
        .where('uid', '==', uid)
        .get()
        .then((col) => {
          col.docs[0].ref.update({
            username,
          } as Partial<UserData>);

          res.status(200).end();
        })
        .catch((err) => {
          if (isDev) {
            console.log(err);
          }

          res.status(500).json({ error_msg: "Failed update user's document" });
        });
    })
    .catch((err) => {
      if (isDev) {
        console.log(err);
      }

      res.status(500).json({ error_msg: "Failed update user's account " });
      return;
    });
};

export default updateUsername;
