/**
 * IntroSection — reproduit le frame "section intro" (77:464).
 * "Introduction" heading + 3 colonnes de texte Crimson Text justifié.
 */
export default function IntroSection({ col1 = [], col2 = [], col3 = [] }) {
  return (
    <section className="relative w-full px-[80px] pt-[80px] pb-[100px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-heading text-white mb-16">Présentation</h2>

        <div className="grid grid-cols-3 gap-0 relative">
          <div className="absolute inset-y-0 left-1/3 w-px bg-white/15" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-white/15" />

          <Column blocks={col1} paddingClass="pr-10" />
          <Column blocks={col2} paddingClass="px-10" />
          <Column blocks={col3} paddingClass="pl-10" />
        </div>
      </div>
    </section>
  );
}

function Column({ blocks, paddingClass }) {
  if (!blocks?.length) return <div className={paddingClass} />;
  return (
    <div className={paddingClass}>
      {blocks.map((block, i) => (
        <p key={block.id ?? i} className="text-body text-white mb-6">
          {block.value}
        </p>
      ))}
    </div>
  );
}
