export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();

    image.src = src;
  });
}
