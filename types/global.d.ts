export {};
declare global {
  interface CardInfo {
    titleTop?: string;
    titleBottom?: string;
    subtitle?: string;
    description?: string;
    number?: string;
    image?: string;
    alt?: string;
    theme?: ColorTheme;
    page?: string;
    scrollId?: string;
  }
}
