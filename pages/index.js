import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Image from '@/components/Image'
import featuredprojectsData from '@/data/featuredprojectsData'
import Card from '@/components/Card'
import formatDate from '@/lib/utils/formatDate'
import Script from 'next/script'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-y-2 pt-6 pb-4 md:space-y-5">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col pr-8">
            <h1 className="mb-1 text-3xl font-bold tracking-tight text-zinc-800 dark:text-white md:text-5xl">
              Azka Radinka
            </h1>
            <h2 className="mb-1 text-xl font-bold tracking-tight text-zinc-600 dark:text-white md:text-2xl">
              Data Analytics - Photography
            </h2>
          </div>
        </div>
        <p className="space-y-4 text-zinc-500 dark:text-slate-300">
          <p className="my-4 leading-loose">
            Graduated with a Bachelor's in Statistics at Sepuluh Nopember Institute of Technology, I
            have{' '}
            <a
              className="focusable rounded-sm font-medium text-zinc-800 underline decoration-blue-800 decoration-2 underline-offset-2 transition duration-100 hover:text-blue-800 hover:decoration-blue-800/30 focus:text-blue-500 focus:ring-blue-500/40 dark:text-white dark:decoration-sky-400 dark:hover:text-sky-400 dark:hover:decoration-sky-400/30 dark:focus:text-sky-400 dark:focus:ring-sky-400/40"
              href="https://aradinka.vercel.app/blog/post-intern-ddb"
              rel="noreferrer"
              target="_blank"
            >
              one year of data science internship
            </a>{' '}
            experience at technical AI team DDB Telkom Indonesia and one year of experience as a
            computing lab assistant{' '}
            <a
              className="focusable rounded-sm font-medium text-zinc-800 underline decoration-green-500 decoration-2 underline-offset-2 transition duration-100 hover:text-green-500 hover:decoration-green-500/30 focus:text-lime-500 focus:ring-lime-500/40 dark:text-white dark:decoration-lime-400 dark:hover:text-lime-400 dark:hover:decoration-lime-400/30 dark:focus:text-lime-400 dark:focus:ring-lime-400/40"
              href="https://aradinka.vercel.app/blog/post-asdos"
              rel="noreferrer"
              target="_blank"
            >
              teaching data analytics
            </a>{' '}
            course, I graduated from{' '}
            <a
              className="focusable rounded-sm font-medium text-zinc-800 underline decoration-sky-700 decoration-2 underline-offset-2 transition duration-100 hover:text-sky-700 hover:decoration-sky-500/30 focus:text-orange-500 focus:ring-sky-500/40 dark:text-white dark:decoration-blue-400 dark:hover:text-blue-400 dark:hover:decoration-blue-400/30 dark:focus:text-blue-400 dark:focus:ring-blue-400/40"
              href="https://grow.google/intl/id_id/bangkit/"
              rel="noreferrer"
              target="_blank"
            >
              Google Bangkit 2021
            </a>{' '}
            and got my{' '}
            <a
              className="focusable rounded-sm font-medium text-zinc-800 underline decoration-violet-500 decoration-2 underline-offset-2 transition duration-100 hover:text-violet-500 hover:decoration-violet-500/30 focus:text-violet-500 focus:ring-violet-500/40 dark:text-white dark:decoration-violet-400 dark:hover:text-violet-400 dark:hover:decoration-violet-400/30 dark:focus:text-violet-400 dark:focus:ring-violet-400/40"
              href="https://www.credential.net/d30e68da-5c26-4873-9de5-17b83888c6ff#gs.giczg9"
              rel="noreferrer"
              target="_blank"
            >
              TensorFlow Developer Certificate.
            </a>
          </p>
        </p>
      </div>
      <div className="content mb-8">
        <h2 className="mb-2 text-xl font-bold text-zinc-800 dark:text-white">Projects</h2>
        <div className="-m-4 flex flex-wrap">
          {featuredprojectsData.map((d) => (
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
      <div className="mb-2">
        <h2 className="mb-2 text-xl font-bold text-zinc-800 dark:text-white">Photography</h2>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img style="width:100%;" src="/static/gifs/ilits.gif" />
        </div>
      </div>
      <div className="content mt-12 sm:mt-24">
        <h2 className="mb-2 text-xl font-bold text-zinc-800 dark:text-white">Experiences</h2>
        <ul className="mt-8">
          <li className="dark:text-zinc-350 my-5 flex items-center gap-4 text-zinc-500">
            <a
              className="link focusable font-medium text-zinc-800 dark:text-white"
              href="https://www.telkom.co.id/sites/about-telkom/en_US"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/static/images/company/ddbtelkom.svg"
                alt="DDB Telkom Indonesia"
                width="50px"
                height="50px"
                className="rounded-md"
              />
            </a>
            <div className="flex min-w-0 flex-col justify-center">
              <p className="mb-1 flex items-center">
                <span className="truncate font-semibold text-zinc-700 dark:text-zinc-100">
                  DDB Telkom Indonesia
                </span>
                <span className="ml-1.5 inline-block flex-none translate-y-px rounded bg-zinc-100 p-1 text-xs font-medium leading-none text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  Jul 2021
                  <span className="text-zinc-350 dark:text-zinc-550 mx-0.5">—</span>
                  Jun 2022
                </span>
              </p>
              <p className="flex items-center truncate">
                <span className="flex-1 truncate text-zinc-500 dark:text-zinc-400">
                  Data Scientist Intern
                </span>
              </p>
            </div>
          </li>
          <li className="dark:text-zinc-350 my-5 flex items-center gap-4 text-zinc-500">
            <a
              className="link focusable font-medium text-zinc-800 dark:text-white"
              href="https://www.its.ac.id/"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/static/images/company/ITS.png"
                alt="Sepuluh Nopember Institute of Technology"
                width="50px"
                height="50px"
                className="rounded-md"
              />
            </a>
            <div className="flex min-w-0 flex-col justify-center">
              <p className="mb-1 flex items-center">
                <span className="truncate font-semibold text-zinc-700 dark:text-zinc-100">
                  Sepuluh Nopember Institute of Technology
                </span>
                <span className="ml-1.5 inline-block flex-none translate-y-px rounded bg-zinc-100 p-1 text-xs font-medium leading-none text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  Feb 2021
                  <span className="text-zinc-350 dark:text-zinc-550 mx-0.5">—</span>
                  Jun 2021
                </span>
                <span className="ml-1.5 inline-block flex-none translate-y-px rounded bg-zinc-100 p-1 text-xs font-medium leading-none text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  Feb 2022
                  <span className="text-zinc-350 dark:text-zinc-550 mx-0.5">—</span>
                  Jun 2022
                </span>
              </p>
              <p className="flex items-center truncate">
                <span className="flex-1 truncate text-zinc-500 dark:text-zinc-400">
                  Computing Lab Assistant - Statistics Department
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-2">
        <iframe
          src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI&font=Default&lang=en&initial_zoom=2&height=650"
          width="100%"
          height="650"
          webkitallowfullscreen
          mozallowfullscreen
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </>
  )
}
