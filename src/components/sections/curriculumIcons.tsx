// A distinct amber geometric mark per curriculum part (themes 1..7).
// Each renders in currentColor, so set the colour on the wrapper (text-accent).

type Inner = () => React.ReactNode;

const ICONS: Inner[] = [
  // 01 — orbit of rotated squares (motion / cycle)
  () => (
    <>
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
        const cx = 60 + 40 * Math.cos(a);
        const cy = 60 + 40 * Math.sin(a);
        return (
          <rect
            key={i}
            x={cx - 11}
            y={cy - 11}
            width={22}
            height={22}
            rx={2.5}
            transform={`rotate(${i * 51 + 18} ${cx} ${cy})`}
          />
        );
      })}
    </>
  ),
  // 02 — layered stack
  () => (
    <>
      <rect x={20} y={20} width={48} height={48} rx={3} opacity={0.45} />
      <rect x={36} y={36} width={48} height={48} rx={3} opacity={0.72} />
      <rect x={52} y={52} width={48} height={48} rx={3} />
    </>
  ),
  // 03 — quad with a rotated tile
  () => (
    <>
      <rect x={16} y={16} width={38} height={38} rx={3} />
      <rect x={66} y={16} width={38} height={38} rx={3} transform="rotate(45 85 35)" />
      <rect x={16} y={66} width={38} height={38} rx={3} transform="rotate(45 35 85)" />
      <rect x={66} y={66} width={38} height={38} rx={3} />
    </>
  ),
  // 04 — staircase
  () => (
    <>
      <rect x={10} y={12} width={30} height={30} rx={2.5} />
      <rect x={45} y={45} width={30} height={30} rx={2.5} />
      <rect x={80} y={78} width={30} height={30} rx={2.5} />
    </>
  ),
  // 05 — nested frame
  () => (
    <>
      <rect
        x={14}
        y={14}
        width={92}
        height={92}
        rx={5}
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
      />
      <rect x={44} y={44} width={32} height={32} rx={3} />
    </>
  ),
  // 06 — outward burst
  () => (
    <>
      <polygon points="60,6 76,48 44,48" />
      <polygon points="114,60 72,76 72,44" />
      <polygon points="60,114 44,72 76,72" />
      <polygon points="6,60 48,44 48,76" />
    </>
  ),
  // 07 — pinwheel
  () => (
    <>
      {[0, 90, 180, 270].map((d) => (
        <polygon key={d} points="60,60 58,14 98,36" transform={`rotate(${d} 60 60)`} />
      ))}
    </>
  ),
];

export default function CurriculumIcon({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const Inner = ICONS[index % ICONS.length];
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <Inner />
    </svg>
  );
}
