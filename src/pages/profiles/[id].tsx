import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { ssgHelpers } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from "next/error"


const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {
  const {data: profile} = api.profile.getById.useQuery({id});

  if(profile == null || profile.name == null) return <ErrorPage statusCode={404} />
  
  return <>
    <Head>
      <title>{`Twitter Clone ${profile.name}`}</title>
    </Head>
  </>
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext<{id: string}>) {
  const id = ctx.params?.id

  if(id == null) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  const ssg = ssgHelpers();
  await ssg.profile.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    }
  }
}

export default ProfilePage;