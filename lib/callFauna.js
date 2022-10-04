import faunadb from "faunadb";
const {
  Let,
  Call,
  Function,
  Create,
  Update,
  CurrentIdentity,
  Intersection,
  Select,
  Var,
  Ref,
  Collection,
  Map,
  Logout,
  Tokens,
  Match,
  Index,
  Exists,
  If,
  Get,
  Paginate,
  Union,
  Lambda,
  Foreach,
  Delete,
  Do,
  Equals,
  Abort,
} = faunadb.query;

export const getPageByHandle = async ({ handle }) => {
  const client = new faunadb.Client({
    secret: process.env.NEXT_PUBLIC_FAUNA_READ_PAGES,
  });
  return await client.query(
    Select("data", Get(Match(Index("page_by_handle_unique"), handle)))
  );
};
