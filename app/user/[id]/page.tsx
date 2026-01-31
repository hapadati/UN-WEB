import UserProfileClient from '@/components/UserProfileClient';

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <UserProfileClient id={id} />;
}
