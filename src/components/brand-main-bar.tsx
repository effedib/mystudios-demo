import Image from "next/image";

/** Logo su area principale a sfondo chiaro (evita bordo bianco nella sidebar scura). */
export function BrandMainBar() {
  return (
    <header className="shrink-0 border-b border-border/80 bg-background px-4 py-3 sm:px-6 sm:py-3.5">
      <Image
        src="/brand/logo-ms.png"
        alt="My Studio MS"
        width={3330}
        height={1259}
        className="h-9 w-auto max-w-[200px] object-contain object-left sm:h-10 sm:max-w-[220px]"
        priority
      />
    </header>
  );
}
