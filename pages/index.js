import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
 
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="m-8">
        <p className="text-center">Hello I'm Soon, and I like programming. </p>
      </section>
      <section class="text-lg p-1">
        <h2 className="my-4 text-xl font-bold">Project</h2>
          <ul class="list-none">
            <li class="text-md">
              <Link class="cursur-pointer hover:text-gray-500/100" href={`/projects/webgl`}>
                WebGL Demo
              </Link>
              <br />
            </li>
          </ul>
        <h2 className="my-4 text-xl font-bold">Blog</h2>
        <ul class="list-none">
          {allPostsData.map(({ id, date, title }) => (
            <li class="text-md" key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className="text-base decoration-gray-300">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
