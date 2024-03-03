'use client';

import React from 'react';
import Head from 'next/head';
import FavoritesList from '../../components/favorite-list/FavoriteList';

const Page = () => (
  <>
    <Head>
      <title>Favorite list</title>
    </Head>

    <FavoritesList />
  </>
);

export default Page;
