import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function sanitizeSVG(svgContent) {
    return DOMPurify.sanitize(svgContent, { USE_PROFILES: { svg: true } });
}