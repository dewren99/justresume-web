import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Profile from "./profile/[username]";


export default withUrqlClient(createUrqlClient, {ssr: true})(Profile); 