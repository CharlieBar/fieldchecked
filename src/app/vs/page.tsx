import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('vs');

export default function Page() {
  return <HubPage hubKey="vs" />;
}
