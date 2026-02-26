function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-2xl border border-slate-700 bg-card p-4">
            <div className="h-4 w-1/2 rounded bg-slate-700" />
            <div className="mt-3 h-3 w-full rounded bg-slate-800" />
            <div className="mt-2 h-3 w-5/6 rounded bg-slate-800" />
            <div className="mt-4 h-8 w-24 rounded bg-slate-700" />
        </div>
    );
}

export default SkeletonCard;
