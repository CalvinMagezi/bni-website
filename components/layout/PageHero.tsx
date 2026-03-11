interface PageHeroProps {
  title: string
  subtitle?: string
  bgImage?: string
}

export default function PageHero({ title, subtitle, bgImage }: PageHeroProps) {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        paddingTop: '64px', // offset for sticky nav
        minHeight: bgImage ? '340px' : '240px',
        background: bgImage
          ? `linear-gradient(rgba(7,13,79,0.82) 0%, rgba(13,23,135,0.75) 100%), url(${bgImage}) center/cover no-repeat`
          : 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)',
      }}
    >
      <div className="relative z-10 py-16 px-6">
        <h1
          className="text-white text-4xl md:text-5xl font-bold"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-bni-light mt-3 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
