import siteMetadata from '@/data/siteMetadata'
import photographyData from '@/data/photographyData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Photography() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Photography Reels
          </h1>
        </div>
        <div className="mb-2">
          <iframe
            src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1TBHh1Ki2_UJtOGNn9h9NrFE_dfHJLNtOKFwN3Yo09KQ&font=Default&lang=en&initial_zoom=2&height=650"
            width="100%"
            height="650"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {photographyData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
