import { useMemo } from 'react';

function GhostCard({ ghost, showDetails, selectedEvidence }) {
  const [isExpanded, setIsExpanded] = useMemo(
    () => [false, () => {}],
    []
  );

  const ghostEmojis = {
    'Spirit': '👻',
    'Wraith': '👤',
    'Phantom': '🌫️',
    'Poltergeist': '💥',
    'Banshee': '😱',
    'Jinn': '🌪️',
    'Mare': '😴',
    'Revenant': '🧟',
    'Shade': '🕷️',
    'Demon': '😈',
    'Yurei': '🪬',
    'Oni': '🔥',
    'Yokai': '🎃',
    'Hantu': '❄️',
    'Goryo': '⛩️',
    'Myling': '🔊',
    'Onryo': '🌊',
    'The Twins': '👯',
    'Raiju': '⚡',
    'Obake': '🧬',
    'The Mimic': '🎭',
    'Moroi': '
