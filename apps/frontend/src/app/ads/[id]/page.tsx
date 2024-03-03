'use client';

import React from 'react';
import Head from 'next/head';
import Ad from '../../../components/ad/Ad';

const Page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return (
    <>
      <Head>
        <title>Ad</title>
      </Head>

      <Ad id={id} />
    </>
  );
};

export default Page;
