import { fb } from '@/lib/firebase-client';
import { GetServerSideProps } from 'next';
import redirect from 'nextjs-redirect';

type Props = {
  refURL: string | null;
};

export default function Redirect({ refURL }: Props) {
  // useEffect(() => {
  //   let timeout: any;
  //   if (refURL) {
  //     timeout = setTimeout(() => {
  //       clearTimeout(timeout);
  //     }, 3000);

  //     return;
  //   }
  // }, [refURL]);

  if (refURL) {
    const buildURL = refURL.startsWith('http') ? refURL : `https://${refURL}`;

    const Redirect = redirect(buildURL, { statusCode: 301 });
    return (
      <Redirect>
        <div className="flex flex-col w-full h-screen bg-black justify-center items-stretch text-white">
          <p className="text-center">Redirect you to {refURL}</p>
          <div className="mx-auto mt-4">
            <svg
              className="animate-spin h-5 w-5 mr-3 bg-white"
              viewBox="0 0 24 24"
            ></svg>
          </div>
        </div>
      </Redirect>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-black justify-center items-stretch text-white">
      <p className="text-center text-lg">
        URL seems to be not exists or disabled. Please contact URL owner.
      </p>
    </div>
  );
}

type Params = {
  uuid: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const refURL =
    (await fb
      .firestore()
      .collection('url_data')
      .where('uuid_code', '==', ctx.params?.uuid)
      .get()
      .then((col) => {
        return col?.docs[0]?.data()?.ref_url;
      })) ?? null;

  return {
    props: {
      refURL: refURL ?? null,
    },
  };
};
