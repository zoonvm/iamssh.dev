import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default function Profile({ user }) {
    return (
        <div>
            <h1>Admin Mode: {user?.isLoggedIn && (
                <span>user.username</span>
            )}</h1>
        </div>
    )
}

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
}) {
    const user = req.session.user;

    if (user === undefined){
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                user: { isLoggedIn: false, username: "", avatarUrl: ""}
            }
        }
    }

    return {
        props: { user: req.session.user }
    };
},
sessionOptions);