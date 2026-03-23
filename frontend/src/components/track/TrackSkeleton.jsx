import React from "react";

const TrackSkeleton = () => {
    return (
        <section aria-label="Loading track form" className="mx-auto w-full max-w-4xl space-y-5">
            <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="h-16 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-16 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-16 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-16 animate-pulse rounded-3xl bg-slate-200" />
            </div>

            <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="h-36 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-36 animate-pulse rounded-3xl bg-slate-200" />
            </div>
        </section>
    );
};

export default TrackSkeleton;