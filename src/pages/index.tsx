import { withUrqlClient } from "next-urql";
import NavBar from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <>
      <NavBar/>
      <div>Hello World.</div>
      {data? data.posts.map(post => <div key={post.id}>{post.title}</div> ) : null}
    </>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
