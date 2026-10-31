import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import FaqPage from '../../Components/Faq/FaqPage';
import type { Metadata } from 'next';
import { canonicalUrl } from '../../../lib/site-url';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about working with Lyven, our process, and digital services.',
  alternates: { canonical: canonicalUrl('/faq') },
  openGraph: { url: canonicalUrl('/faq'), title: 'FAQ | Lyven' },
};

const Page = () => {
  return (
    <>

      <FaqPage />
    </>
  );
};

export default Page;
