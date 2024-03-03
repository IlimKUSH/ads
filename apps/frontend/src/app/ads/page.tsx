'use client';

import React from 'react';
import Head from 'next/head';
import AdsList from '../../components/ads-list/AdsList';

const Page = () => (
  <>
    <Head>
      <title>Ads list</title>
    </Head>

    <AdsList />
  </>
);

export default Page;
