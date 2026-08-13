import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('experiments');

export default function Page() {
  return <HubPage hubKey="experiments" />;
}
