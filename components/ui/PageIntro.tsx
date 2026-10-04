interface Props {
  title: string;
  children?: React.ReactNode;
  /** Rendered below the intro text, e.g. a GuidelineNote */
  after?: React.ReactNode;
}

export default function PageIntro({ title, children, after }: Props) {
  return (
    <div className="border-b border-ink/10">
      <div className="container-page pb-8 pt-10 sm:pt-12">
        <h1 className="text-2xl font-bold text-westbridge sm:text-3xl">{title}</h1>
        {children && <div className="mt-4 max-w-[60ch] text-lg">{children}</div>}
        {after && <div className="mt-4 max-w-3xl">{after}</div>}
      </div>
    </div>
  );
}
