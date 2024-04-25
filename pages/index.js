import Head from 'next/head'
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
const SOCIAL_NETWORKS = [
  {
    name: "linkedin", 
    link: "https://www.linkedin.com/in/kevinsoonhong/"
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/kaebong/"
  },
  {
    name: "github",
    link: "https://github.com/zoonvm"
  },
  {
    name: "resume",
    link: "https://hong-resume.s3.amazonaws.com/Resume.pdf"
  }
];

const PAST_EXPERIENCES = [
  {
    company: "Amazon Alexa",
    role: "Software Development Engineer (2019 - 2024)"
  },
  {
    company: "Verto Inc.",
    role: "Founder & Fullstack Engineer (2018 - 2019)"
  },
  {
    company: "CareDash Inc.",
    role: "Web Engineer Intern (2018)"
  }
]
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="mt-8 flex flex-row space-x-4 mb-6 justify-center text-xs font-light">
        {
          SOCIAL_NETWORKS.map((socialNetwork, idx) => (
            <div key={idx}>
              <a target="_blank" rel="noopener noreferrer" href={socialNetwork.link} className="cursur-pointer font-light hover:text-gray-500/100">{socialNetwork.name}</a>
            </div>
          ))
        }
      </section>
      <section className="m-8">
        <p className="text-xs text-left">Soon, a.k.a. Kevin, specializes in backend development with Java and Python and frontend development using JavaScript and TypeScript. He developed a configuration management pipeline at Amazon, which is extensively utilized by the Amazon Alexa Music team.</p>
      </section>
      <section class="text-sm p-1">
        <h2 className="mt-6 mb-6 font-semibold">Select Builds</h2>
        <ul class="list space-y-2">
          <li class="text-xs">
            <a target="_blank" rel="noopener noreferrer" class="cursur-pointer hover:text-gray-500/100" href="https://layoverhr.vercel.app/">
              layover - automate hiring and job application process (in progress)
            </a>
            <br />
          </li>
          <li class="text-xs">
            <a target="_blank" rel="noopener noreferrer" class="cursur-pointer hover:text-gray-500/100" href="https://github.com/zoonvm/milchiever">
              milchiever - planner for soldiers to track progress in goals
            </a>
            <br />
          </li>
        </ul>
        <h2 className="mt-12 mb-6 text-sm font-semibold">Past Experience</h2>
        <div className="space-y-2 text-xs">
          {
            PAST_EXPERIENCES.map((pastExperience, idx) => 
              (
                <div key={idx} className="flex justify-between">
                  <h1>{pastExperience.company}</h1>
                  <p>{pastExperience.role}</p>
                </div>
              )
            )
          }   
        </div>       
      </section>
    </Layout>
  )
}
