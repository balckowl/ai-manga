'use client';

export default function Loading() {
    return (
        <div className="h-[calc(100vh-200px)] grid place-items-center">
            <div className="flex flex-col justify-center items-center" aria-label="ロード中です！">
                <h2 className="font-bold text-[30px]">ロード中です！</h2>
                <div className="mt-5 h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            </div>
        </div>
    )
}