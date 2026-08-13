import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('builds');

export default function Page() {
  return <HubPage hubKey="builds" />;
}
