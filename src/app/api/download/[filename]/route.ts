import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// export as an async _GET_ function. This is a convention in NextJS
const GET = async function GET(req: NextRequest, event: NextFetchEvent) {
  //   let url = req.nextUrl; fake url ; we will fetch from real api instead
  const ACTUAL_FORECAST_URL = `${process.env.NEXT_PUBLIC_BUCKET}/api/v1/forecasts/download_actual_forecast`;
  // /api/v1/statistics/download_statistics/ external file URL
  const STATISTICS_URL = `${process.env.NEXT_PUBLIC_BUCKET}/api/v1/statistics/download_statistics`;
  const testLinks = [
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'https://fsn1-speed.hetzner.com/100MB.bin',
    ACTUAL_FORECAST_URL,
    STATISTICS_URL,
  ];

  const filename = req.nextUrl.searchParams.get('filename')?.trim();
  console.log('Filename:', filename);
  // use fetch to get a response, this way no get files that are bigger than 4mb
  let url;
  switch (filename) {
    case 'dummy.pdf':
      url = new URL(testLinks[0]);
      break;
    case '100MB.bin':
      url = new URL(testLinks[1]);
      break;
    case 'statfile.xlsx':
      url = new URL(STATISTICS_URL);
      break;
    case 'file.xlsx':
      url = new URL(ACTUAL_FORECAST_URL);
      break;
    default:
      url = new URL(testLinks[0]); // "http://127.0.0.1:8000/api/v1/statistics/download_statistics"; // ACTUAL_FORECAST_URL; // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; //
      break;
  }
  console.log('URL:', url);
  console.log(
    'url, nexturl and cookies are: ',
    JSON.stringify(req.url),
    JSON.stringify(req.nextUrl),
    JSON.stringify(req.cookies),
  );
  // console.log("query is", query);
  console.log('for filename', filename);
  console.log('actual forecast is', ACTUAL_FORECAST_URL);
  console.log('statistics is', STATISTICS_URL);
  console.log('response will be fetched from', url);

  const secret = req.headers.get('Authorization') || ''; // Authorization
  console.log('Bearer <token>:', secret); // show is auth ok! usually Auth is ok
  const response = await fetch(url, {
    method: 'GET',
    headers: { ...req.headers, Authorization: secret },
  });
  let respblob = await response.blob();
  let respstatus = response.status;

  if (respstatus === 200) {
    // Add a new header to the response
    const newHeaders = new Headers(response.headers);
    // And produce a response with the new headers
    const res = new NextResponse(respblob, {
      headers: newHeaders,
    });
    return res;
  } else if (respstatus === 401) {
    return new NextResponse('Unauthorized', { status: 401 });
  } else if (respstatus === 500) {
    return new NextResponse('Internal Server Error', { status: 500 });
  } else if (respstatus === 404) {
    return new NextResponse('Not Found', { status: 404 });
  } else if (respstatus === 400) {
    return new NextResponse('Bad Request', { status: 400 });
  } else if (respstatus === 403) {
    return new NextResponse('Forbidden', { status: 403 });
  } else if (respstatus === 405) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  } else {
    return new NextResponse('Something went wrong', { status: 500 });
  }
};

export { GET };
