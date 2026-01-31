import UserProfileClient from '@/components/UserProfileClient';

export const runtime = 'edge';

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <UserProfileClient id={id} />;
}
