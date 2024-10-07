export const hasText = (text: string | null | undefined): boolean =>
  !!text && typeof text === 'string' && text.trim().length > 0;
