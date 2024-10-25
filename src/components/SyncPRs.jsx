import { toast } from 'sonner';
import Global from '@/Global';
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

const SyncPRs = () => {
    const [syncState, setSyncState] = useState({
        status: 'idle',
        retryCount: 0
    });

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    const handleSyncPRs = async () => {
        if (syncState.status === 'loading') return;

        if (!Global.user?.githubId) {
            toast.error('GitHub ID not found. Please ensure you are logged in.');
            setSyncState({ status: 'error', retryCount: 0 });
            return;
        }

        setSyncState(prev => ({
            ...prev,
            status: 'loading'
        }));

        const syncPromise = new Promise(async (resolve, reject) => {
            const attemptSync = async (retryCount) => {
                try {
                    const data = await Global.httpPost("/users/sync-prs", {
                        githubId: Global.user.githubId
                    });

                    setSyncState({ status: 'success', retryCount: 0 });

                    resolve(`Synced ${data?.prCount || 0} PRs`);

                    // Reload the page after successful sync
                    if(data?.prCount > 0)
                    {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }

                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

                    setSyncState(prev => ({
                        ...prev,
                        status: 'error',
                        retryCount: prev.retryCount + 1
                    }));

                    if (errorMessage.includes('rate-limited') || error?.status === 429) {
                        reject('Rate limited. Try again later.');
                        return;
                    }

                    if (error?.status === 401) {
                        reject('Auth failed. Please log in.');
                        return;
                    }

                    if (retryCount < MAX_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                        return attemptSync(retryCount + 1);
                    }

                    reject(`Sync failed: ${errorMessage}`);
                }
            };

            await attemptSync(0);
        });

        toast.promise(syncPromise, {
            // loading: 'Syncing your PRs...',
            success: (message) => message,
            error: (error) => error
        });
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleSyncPRs}
                disabled={syncState.status === 'loading'}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300
                    ${syncState.status === 'loading'
                        ? "bg-gray-700/50 text-gray-300 cursor-not-allowed"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30 active:bg-red-500/40"
                    }`}
            >
                {syncState.status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <RefreshCw className="w-4 h-4" />
                )}
                {syncState.status === 'loading' ? "Syncing..." : "Sync PRs"}
            </button>
        </div>
    );
};

export default SyncPRs;