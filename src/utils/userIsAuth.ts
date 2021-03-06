import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";


export default function userIsAuth() {
    const [{data, fetching}] = useMeQuery();
    const router = useRouter();
    console.log(data, fetching);
    useEffect(() => {
        if(!fetching && !data?.me){
            router.replace('login?next=' + router.pathname);
        }
    }, [data, router, fetching]);
}
