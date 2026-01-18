export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const BOT_ID = process.env.NEXT_PUBLIC_BOT_ID || 'UNITED_NAMELESS_BOT';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        'X-Bot-ID': BOT_ID,
        ...options.headers,
    };

    try {
        const res = await fetch(url, { ...options, headers });
        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Fetch API Error (${endpoint}):`, error);
        return null;
    }
}

// Data Types
export interface LeaderboardEntry {
    rank: number;
    userId: string;
    points: number;
    xp: number;
    level: number;
    username?: string;
    avatarUrl?: string;
}

export interface UserRank {
    userId?: string;
    rank: number;
    level: number;
    xp: number;
    points: number;
    nextLevelXP: number;
}

export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    type: 'buff' | 'role' | 'consumable';
}

export interface InventoryItem {
    itemId: string;
    name: string;
    count: number;
    description: string;
}

// Shop & Inventory APIs
export async function getShopItems(): Promise<{ items: ShopItem[] } | null> {
    return fetchAPI('/economy/shop');
}

export async function buyItem(userId: string, itemId: string): Promise<{ success: boolean, error?: string }> {
    return fetchAPI('/economy/buy', {
        method: 'POST',
        body: JSON.stringify({ userId, itemId }),
    });
}

export async function getUserInventory(userId: string): Promise<{ items: InventoryItem[] } | null> {
    return fetchAPI(`/economy/inventory?userId=${userId}`);
}

export async function useItem(userId: string, itemId: string): Promise<{ success: boolean, message?: string, error?: string }> {
    return fetchAPI('/economy/use', {
        method: 'POST',
        body: JSON.stringify({ userId, itemId }),
    });
}

// Point Conversion
export async function convertPoints(userId: string, points: number) {
    return fetchAPI('/economy/convert', {
        method: 'POST',
        body: JSON.stringify({ userId, points }),
    });
}

// User Balance
export async function getUserBalance(userId: string) {
    return fetchAPI(`/economy/balance?userId=${userId}`);
}

// User Rank
export async function getUserRank(userId: string): Promise<UserRank | null> {
    return fetchAPI(`/economy/rank?userId=${userId}`);
}

// User Activity
export interface ActivityEntry {
    id: string;
    type: 'message' | 'voice' | 'reward' | 'purchase' | 'conversion';
    description: string;
    points?: number;
    xp?: number;
    timestamp: string;
}

export async function getUserActivity(userId: string, limit: number = 10): Promise<ActivityEntry[] | null> {
    const res = await fetchAPI(`/activity/recent?userId=${userId}&limit=${limit}`);
    return res?.activities || null;
}
