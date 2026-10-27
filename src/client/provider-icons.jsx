import React from 'react';
import * as Icons from './icons.jsx';
const ICONS = {'layout-grid': Icons.IconGrid, image: Icons.IconImage, book: Icons.IconBook, 'book-open': Icons.IconBook, 'book-plus': Icons.IconBook, radio: Icons.IconWaves, rss: Icons.IconGlobe, play: Icons.IconPlay, pause: Icons.IconPause, plus: Icons.IconPlus, search: Icons.IconSearch, 'file-text': Icons.IconNotebook, microphone: Icons.IconWaves, mic: Icons.IconWaves, settings: Icons.IconSettings, 'arrow-right': Icons.IconArrowRight, 'external-link': Icons.IconExternal, 'audio-lines': Icons.IconWaves};
export function ProviderIcon({name, size=16}) { const Icon=ICONS[name] || Icons.IconGrid; return <Icon size={size}/>; }
