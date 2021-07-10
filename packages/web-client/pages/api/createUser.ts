import { isDev } from '@/global';
import { CreateUserResponse } from '@/lib/api-typings';
import { admin } from '@/lib/firebase-admin';
import { UserData } from '@/lib/model-types';
import { NextApiHandler } from 'next';

const createUser: NextApiHandler<CreateUserResponse> = async function (
  req,
  res
) {
  const { username, email, password } = req.body;

  await admin
    .auth()
    .createUser({
      displayName: username,
      email,
      password,
    })
    .then(async (userRecord) => {
      await admin
        .firestore()
        .collection('user_data')
        .add({
          uid: userRecord.uid,
          username: userRecord.displayName,
          email: userRecord.email,
        } as UserData)
        .then(() => {
          res.status(200).end();
          return;
        })
        .catch((err) => {
          if (isDev) {
            console.log(err);
          }

          res.status(500).json({ error_msg: "Failed create user's document" });
        });
    })
    .catch((err) => {
      if (isDev) {
        console.log(err);
      }

      res.status(500).json({ error_msg: "Failed create user's account " });
      return;
    });
};

export default createUser;
