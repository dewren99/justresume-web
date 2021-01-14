import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { Cache, cacheExchange, Resolver } from '@urql/exchange-graphcache';
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation, useGetResumeByUserIdQuery } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from 'next/router';
import {pipe, tap} from 'wonka';
import { isServer } from "./isServer";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap( ({error}) => {
      if(error) {
        if(error.message.includes('not authenticated')) {
          Router.replace('/login');
        }
      }
    })
  );
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie;
  if(isServer()){
    console.log(ctx);
    // cookie = ctx.req.headers.cookie;
  }
  return({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie? {cookie} : undefined,
    },
    exchanges: [dedupExchange, cacheExchange(cacheUpdates), ssrExchange, errorExchange, multipartFetchExchange],
  });
}

const cacheUpdates = {
  keys:{
    PaginatedPosts: ()=>null,
  },
  resolvers:{
    Query:{
      posts: cursorPagination(),
      // getUser: (parent, args, cache: Cache, info) => {
      //   // console.log('parent', parent)
      //   // console.log('args',  args)
      //   // console.log('cache', cache)
      //   // console.log('info', info)
      //   const { parentKey: entityKey, fieldName } = info;
      //   const allFields = cache.inspectFields(entityKey);
      //   const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
      //   // const size = fieldInfos.length;
      //   // if (size === 0) {
      //   //   return undefined;
      //   // }
      //   const fieldKey = `${fieldName}(${stringifyVariables(args)})`;
      //   // console.log('entityKey', entityKey) // "Query"
      //   // console.log('fieldName',  fieldName) // "getUser"
      //   // console.log('allFields', allFields) 
      //   // console.log('fieldInfos', fieldInfos) //[arguments: {username: "dewren"} fieldKey: "getUser({"username":"dewren"})" fieldName: "getUser"]
      //   console.log('fieldKey',  fieldKey) //getUser({"username":"dewren"})
      //   console.log('cache.resolve(entityKey, fieldKey)', cache.resolve(entityKey, fieldKey)); //  User:7 -> :id
      //   console.log('cache.resolve(entityKey, fieldKey)', cache.resolve(entityKey, fieldKey)); //  User:7 -> :id
    
      //   const isItInTheCache = cache.resolve(
      //     cache.resolve(entityKey, fieldKey) as string,
      //     "getUser"
      //   );
      //   console.log('isItInTheCache', isItInTheCache);
      //   console.log('info.partial', info.partial);
      //   // info.partial = !isItInTheCache;
      //   // let hasMore = true;
      //   let results = {};
      //   console.log('cache', cache)
      //   console.log('fieldInfos', fieldInfos)
      //   fieldInfos.forEach((fi, i) => {
      //     console.log(entityKey, fi.fieldKey, i);
      //     const key = cache.resolve(entityKey, fi.fieldKey) as string;
      //     const lastName = cache.resolve(key, "lastName");
      //     const firstName = cache.resolve(key, "firstName");
      //     const aboutMe = cache.resolve(key, "aboutMe");
      //     const id = cache.resolve(key, "id");
      //     const username = cache.resolve(key, "username");
      //     const email = cache.resolve(key, "email");
      //     const resume = cache.resolve(key, "resume");

      //     results = { firstName, lastName, aboutMe, id, username, email, resume };
      //     console.log(entityKey, fi.fieldKey, i, key, lastName, firstName);
      //   });
    
      //   return {
      //     __typename: "User",
      //     ...results
      //   };
      // }
    }
  },
  updates: {
    Mutation: {
      logout: (_result, args, cache, info) => {
        betterUpdateQuery<LogoutMutation, MeQuery>(
          cache,
          {query: MeDocument},
          _result,
          () => ({me: null})
        );
      },
      login: (_result, args, cache, info) => {
        betterUpdateQuery<LoginMutation, MeQuery>(
          cache, 
          {query: MeDocument},
          _result,
          (result, query) => {
            if(result.login.errors){
              return query;
            }
            else{
              return {me: result.login.user};
            }
          }
        )
      },
      register: (_result, args, cache, info) => {
        betterUpdateQuery<RegisterMutation, MeQuery>(
          cache, 
          {query: MeDocument},
          _result,
          (result, query) => {
            if(result.register.errors){
              return query;
            }
            else{
              return {me: result.register.user};
            }
          }
        )
      }

    }
  }
};
//