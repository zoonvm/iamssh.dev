import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

import useUser from "lib/useUser";
import fetchJson from 'lib/fetchJson';

const name = 'Soon H'
const socialNetworks = [
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
  }
];

export const siteTitle = 'Soon H'

export default function Layout({ children, home }) {
    const { user, mutateUser } = useUser();
    const router = useRouter();

    const logOut = async (e) => {
      e.preventDefault();
      mutateUser(
        await fetchJson("api/logout", { method: "POST"}),
        {
          revalidation: false
        }
      );
      router.push("/admin")
    }

    return (
      <div className="max-w-lg mt-16 mx-auto">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="og:title" content={siteTitle} />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js"
            integrity="sha512-zhHQR0/H5SEBL3Wn6yYSaTTZej12z0hVZKOv3TwCUXT1z5qeqGcXJLLrbERYRScEDDpYIJhPC1fk31gqR783iQ=="
            crossOrigin="anonymous"
            defer 
          />
        </Head>
        <header className="flex flex-col items-center">
          { user?.isLoggedIn === true && (
              <div>
                <h1 className="font-bold">Admin Mode</h1>
              </div>
          )}
          { 
            user?.isLoggedIn && (
              <div className="text-center">
                <a 
                  href="/api/logout"
                  onClick={logOut}
                >
                  Logout
                </a>
              </div>
            )
          }
          {home ? (
            <>
              <div class="flex flex-row h-96 w-50 overflow-x-scroll"> 
                <img src={"images/nyc-me.jpeg"}/>
                <img src={"/images/military.JPG"}/>
                <img src={"/images/hollywood-me.jpeg"}/>
                <img src={"/images/me.png"}/> 
              </div>
              <div className="flex justify-center align-middle cursor-pointer mt-3">
                {socialNetworks.map(({ name, link }, idx) => (
                  <div className="mx-2.5" key={idx}>
                    <Link href={link}>
                      <Image 
                        src={`/images/${name}.png`}
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl">
                <Link legacyBehavior href="/">
                  <a className="text-4xl font-black mb-2">{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className="mt-3">
            <Link legacyBehavior href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    )
  }
