export interface UseTranslation {
  t: (text: string) => string;
}

export const useTranslation = (): UseTranslation => {
  const t = (text: string) => text;

  return { t };
};

export default useTranslation;
