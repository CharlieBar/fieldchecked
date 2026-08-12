import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('studio');

export default function Page() {
  return <HubPage hubKey="studio" />;
}
