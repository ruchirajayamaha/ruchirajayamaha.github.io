import { useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, Search } from 'lucide-react';
import Modal from './Modal';

function PaletteSearch({ onClose, commands }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) => `${command.label} ${command.keywords}`.toLowerCase().includes(needle));
  }, [commands, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const runCommand = (command) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(results[activeIndex]);
    }
  };

  return (
    <>
      <label id="command-palette-label" className="sr-only" htmlFor="command-palette-input">Quick navigation</label>
      <div className="flex items-center gap-3 px-4 border-b border-slate-800">
        <Search className="w-4 h-4 text-slate-500 shrink-0" />
        <input
          id="command-palette-input"
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-palette-results"
          aria-activedescendant={results[activeIndex] ? `command-${results[activeIndex].id}` : undefined}
          autoComplete="off"
          placeholder="Jump to a section or action..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 py-3.5 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <kbd className="hidden sm:inline font-mono text-[10px] text-slate-500 border border-slate-800 rounded px-1.5 py-0.5">Esc</kbd>
      </div>

      <ul ref={listRef} id="command-palette-results" role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-2">
        {results.map((command, index) => {
          const isActive = index === activeIndex;
          return (
            <li
              key={command.id}
              id={`command-${command.id}`}
              role="option"
              aria-selected={isActive}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => runCommand(command)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer ${
                isActive ? 'bg-indigo-600/20 text-indigo-100' : 'text-slate-300'
              }`}
            >
              <command.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-500'}`} />
              <span className="flex-1 min-w-0 truncate">{command.label}</span>
              <span className="font-mono text-[10px] text-slate-500">{command.group}</span>
              {isActive && <CornerDownLeft className="hidden sm:block w-3.5 h-3.5 text-slate-500" />}
            </li>
          );
        })}
        {results.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-slate-500">No matches for "{query}"</li>
        )}
      </ul>
    </>
  );
}

export default function CommandPalette({ open, onClose, commands }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="command-palette-label" align="top" panelClassName="max-w-lg overflow-hidden">
      <PaletteSearch onClose={onClose} commands={commands} />
    </Modal>
  );
}
