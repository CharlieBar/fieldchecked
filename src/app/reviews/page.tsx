import { HubPage, hubMetadata } from '@/components/HubPage';

export const metadata = hubMetadata('reviews');

export default function Page() {
  return <HubPage hubKey="reviews" />;
}
