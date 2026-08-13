import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('blog');

export default function Page() {
  return <HubPage hubKey="blog" />;
}
