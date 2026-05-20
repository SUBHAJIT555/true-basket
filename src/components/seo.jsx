import Head from "next/head";
import { siteInfo } from "@/data/contact-info";

const SEO = ({ pageTitle, description }) => (
  <>
    <Head>
      <title>
        {pageTitle
          ? `${pageTitle} - ${siteInfo.companyName}`
          : `${siteInfo.companyName} | ${siteInfo.domain}`}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={description || siteInfo.tagline} />
      <meta name="robots" content="noindex, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  </>
);

export default SEO;
