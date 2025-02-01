import RootLayout from './layout-wrapper';
import { headers, cookies } from 'next/headers';

export default async function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const tabsHeader = headersList.get("X-Tabs");
  const tabs = tabsHeader ? JSON.parse(tabsHeader as string) : [];

  const cookiesList = await cookies();
  const authToken = cookiesList.get("authToken");
  const isPriv = authToken?true:false;

  return <RootLayout tabs={tabs} isPriv={isPriv}>{children}</RootLayout>;
}
