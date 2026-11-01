import { useEffect, useRef, useState } from 'react';

// KaTeX and its fonts are fetched on first use so routes without formulas never pay for them.
// Until it loads, or if it fails, the raw LaTeX source stays visible.
const loadKatex = () => Promise.all([import('katex'), import('katex/dist/katex.min.css')]);

export default function MathFormula({ math, block = false }) {
    const containerRef = useRef(null);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        let cancelled = false;

        loadKatex()
            .then(([{ default: katex }]) => {
                if (cancelled || !containerRef.current) return;
                katex.render(math, containerRef.current, {
                    displayMode: block,
                    throwOnError: false,
                });
                setIsRendered(true);
            })
            .catch((err) => {
                console.error('KaTeX failed to render formula', err);
                if (!cancelled) setIsRendered(false);
            });

        return () => {
            cancelled = true;
            setIsRendered(false);
        };
    }, [math, block]);

    return (
        <div className={`text-indigo-300 font-mono overflow-x-auto max-w-full py-1 no-scrollbar text-xs sm:text-sm ${block ? 'text-center my-1 block' : 'inline-block'}`}>
            <div ref={containerRef} hidden={!isRendered} />
            {!isRendered && <code className="whitespace-pre-wrap break-words text-slate-400">{math}</code>}
        </div>
    );
}
