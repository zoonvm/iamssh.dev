import { useState } from 'react';
import { useRouter } from "next/router";

import Layout from "../components/layout";
import fetchJson, { FetchError } from 'lib/fetchJson';
import useUser from 'lib/useUser';


export default function Admin(){
    const { mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true
    });
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target);
        
        try {
            mutateUser(
                await fetchJson("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Object.fromEntries(formData.entries()))
                }, 
                {  
                    revalidation: false
                })
            );
        } catch (error) {
            if (error instanceof FetchError){
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
        setIsLoading(false);
    }

    return (
        <Layout>
            <h1 className="text-lg font-bold">Admin Login</h1>
            <form onSubmit={onSubmit}>
                <label for="username" >Username</label>
                <input name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <label for="password">Password</label>
                <input name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <span>{errorMsg}</span>
                <button type="submit" disabled={isLoading} class="bg-gray-500 hover:bg-gray-700 text-white my-3 py-1 px-2 rounded">
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </Layout>
    )
}