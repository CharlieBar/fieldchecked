import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('verdict');

export default function Page() {
  return <HubPage hubKey="verdict" />;
}
