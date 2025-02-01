"use server"

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken');
  const url = request.nextUrl; 
  const restricted = new Set(['/login', '/signup', '/forgotPassword']);
  var response;

  const tabs = [{
    title: 'Browse',
    path: '/browse'
  }];

  if (authToken) {
    tabs.push({title: 'List', path:'/list'});
    tabs.push({title: 'Dashboard', path:'/dashboard'});
  };

  if (authToken && restricted.has(url.pathname)) {
    response = NextResponse.rewrite(new URL('/dashboard', url));
  } else {
    response = NextResponse.next();
  };
  
  response.headers.set('X-Tabs', JSON.stringify(tabs));

  return response;
}

export const config = {
  matcher: [
    '/:path*',
  ], 
};