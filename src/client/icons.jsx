/**
 * 内联 SVG 图标（Lucide 风格描边），避免依赖任何 DSH 客户端包。
 * 全部接收 size 与可选 strokeWidth。
 */
import React from 'react';

function makeIcon(paths, { filled = false } = {}) {
  function Icon({ size = 16, strokeWidth = 1.8, className }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        {paths.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </svg>
    );
  }
  Icon.displayName = 'QhIcon';
  return Icon;
}

export const IconHome = makeIcon([
  'M3 10.5 12 3l9 7.5',
  'M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5',
]);

export const IconSearch = makeIcon(['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'm21 21-4.3-4.3']);

export const IconPlus = makeIcon(['M12 5v14', 'M5 12h14']);

export const IconSettings = makeIcon([
  'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
]);

export const IconFolder = makeIcon([
  'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
]);

export const IconGlobe = makeIcon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
  'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20',
  'M2 12h20',
]);

export const IconCheck = makeIcon(['M20 6 9 17l-5-5']);

export const IconTrash = makeIcon([
  'M3 6h18',
  'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
  'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
]);

export const IconPlay = makeIcon(['m6 4 14 8-14 8V4z']);

export const IconPause = makeIcon(['M8 4v16', 'M16 4v16']);

export const IconRefresh = makeIcon([
  'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
  'M21 3v5h-5',
  'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
  'M3 21v-5h5',
]);

export const IconList = makeIcon(['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01']);

export const IconClock = makeIcon(['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2']);

export const IconQuote = makeIcon([
  'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z',
  'M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z',
]);

export const IconSun = makeIcon([
  'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'M12 2v2',
  'M12 20v2',
  'm4.93 4.93 1.41 1.41',
  'm17.66 17.66 1.41 1.41',
  'M2 12h2',
  'M20 12h2',
  'm6.34 17.66-1.41 1.41',
  'm19.07 4.93-1.41 1.41',
]);

export const IconCloud = makeIcon(['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z']);

export const IconCloudSun = makeIcon([
  'M12 2v2',
  'm4.93 4.93 1.41 1.41',
  'M20 12h2',
  'm19.07 4.93-1.41 1.41',
  'M15.947 12.65a4 4 0 0 0-5.925-4.128',
  'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z',
]);

export const IconCloudRain = makeIcon([
  'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242',
  'M16 14v6',
  'M8 14v6',
  'M12 16v6',
]);

export const IconCloudSnow = makeIcon([
  'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242',
  'M8 15h.01',
  'M8 19h.01',
  'M12 17h.01',
  'M12 21h.01',
  'M16 15h.01',
  'M16 19h.01',
]);

export const IconCloudFog = makeIcon([
  'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242',
  'M6 19h12',
  'M8 22h8',
]);

export const IconCloudLightning = makeIcon([
  'M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973',
  'm13 12-3 5h4l-3 5',
]);

export const IconExternal = makeIcon([
  'M15 3h6v6',
  'M10 14 21 3',
  'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
]);

export const IconImage = makeIcon([
  'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z',
  'M8.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  'm21 15-5-5L5 21',
]);

export const IconMessage = makeIcon(['M7.9 20A9 9 0 1 0 4 16.1L2 22Z']);

export const IconClose = makeIcon(['M18 6 6 18', 'm6 6 12 12']);

export const IconTimer = makeIcon([
  'M10 2h4',
  'M12 14v-4',
  'M4.93 4.93l2.83 2.83',
  'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
]);

export const IconGauge = makeIcon([
  'm12 14 4-4',
  'M3.34 19a10 10 0 1 1 17.32 0',
]);

export const IconLink = makeIcon([
  'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
  'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
]);

export const IconCalendar = makeIcon([
  'M8 2v4',
  'M16 2v4',
  'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z',
  'M3 10h18',
]);

export const IconFlame = makeIcon([
  'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
]);

export const IconHourglass = makeIcon([
  'M5 22h14',
  'M5 2h14',
  'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22',
  'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2',
]);

export const IconGrid = makeIcon([
  'M3 3h7v7H3z',
  'M14 3h7v7h-7z',
  'M14 14h7v7h-7z',
  'M3 14h7v7H3z',
]);

export const IconPen = makeIcon([
  'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z',
  'm15 5 4 4',
]);

export const IconNotebook = makeIcon([
  'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20',
]);

export const IconWaves = makeIcon([
  'M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
]);

export const IconHelpCircle = makeIcon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
  'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3',
  'M12 17h.01',
]);

export const IconCopy = makeIcon([
  'M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2Z',
  'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
]);

export const IconTarget = makeIcon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
  'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z',
  'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
]);

export const IconZap = makeIcon(['M13 2 3 14h9l-1 8 10-12h-9l1-8z']);
