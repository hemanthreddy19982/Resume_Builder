import { Customizations } from '@shared/types';

export function getFontFamilyClass(font?: string): string {
  switch (font) {
    case 'Merriweather':
    case 'Serif':
      return 'font-serif';
    case 'Outfit':
      return 'font-outfit';
    case 'Space Grotesk':
      return 'font-mono';
    default:
      return 'font-sans';
  }
}

export function getFontSizeClass(size?: Customizations['fontSize']): string {
  switch (size) {
    case 'sm':
      return 'text-xs';
    case 'lg':
      return 'text-base';
    default:
      return 'text-sm';
  }
}

export function getMarginClass(margin?: Customizations['margin']): string {
  switch (margin) {
    case 'compact':
      return 'p-6 gap-4';
    case 'spacious':
      return 'p-12 gap-8';
    default:
      return 'p-8 gap-6';
  }
}
