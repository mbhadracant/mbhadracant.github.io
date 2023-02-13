
let MARGIN = 60;
if (window.innerWidth < 768) MARGIN = 30;

export const SVG_HEIGHT = window.innerHeight - 200 - MARGIN;
export const SVG_WIDTH = window.innerWidth - 60;

export { MARGIN };

export const DELAY = 0.5;

export const getSVGWidth = () => window.innerWidth - 60;
export const getSVGHeight = () => window.innerHeight - 200 - MARGIN;