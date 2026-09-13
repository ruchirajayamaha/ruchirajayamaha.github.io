import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathFormula({ math, block = false }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            katex.render(math, containerRef.current, {
                displayMode: block,
                throwOnError: false,
            });
        }
    }, [math, block]);

    return (
        <div
            ref={containerRef}
            className={`text-indigo-300 font-mono overflow-x-auto max-w-full py-1 no-scrollbar text-xs sm:text-sm ${block ? 'text-center my-1 block' : 'inline-block'}`}
        />
    );
}