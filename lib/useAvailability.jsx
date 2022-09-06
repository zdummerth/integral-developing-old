import useSWR from "swr";
import callApi from "./callApi";
const useAvailabilty = ({ titles }) => {
  const url = "/api/shopify-graphql";
  const query = `query getTotalInventory($first: Int, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          totalInventory
        }
      }
    }
  }`;
  const { data, error } = useSWR([url], () =>
    callApi(url, "POST", {
      data: {
        query,
        variables: { first: 50, query: "" },
      },
    })
  );

  return {
    data,
    error,
    loading: !data && !error,
  };
};

export default useAvailabilty;
