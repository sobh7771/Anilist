import { useRouter } from "next/router";

/*
 * QUERIES
 */
const query = gql`
  query media($id: Int, $type: MediaType, $page: Int, $perPage: Int = 5) {
    Media(id: $id, type: $type) {
      staff(page: $page, perPage: $perPage) {
        edges {
          id
          role
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
        pageInfo {
          lastPage
          currentPage
        }
      }
    }
  }
`;

/*
 * QUERY FUNCTIONS
 */
const getStaff = ({ queryKey, pageParam = 1 }) =>
  request(API_URL, query, { page: pageParam, ...queryKey[1] });

import Member from "./Member";
import InfiniteScroll from "./InfiniteScroll";
import request, { gql } from "graphql-request";
import { API_URL } from "config";

function Staff({ type }) {
  const router = useRouter();
  return (
    <div>
      <InfiniteScroll
        queryOptions={{
          queryFn: getStaff,
          queryKey: ["staff", { id: router.query.id, type }],
          getNextPageParam: (last, all) => {
            const { currentPage, lastPage } = last.Media.staff.pageInfo;
            if (currentPage === lastPage) {
              return;
            }
            return +currentPage + 1;
          },
        }}
      >
        {({ data }) => (
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
              column-gap: 3rem;
              > div:not(:last-child) {
                margin-bottom: 1.5rem;
              }
            `}
          >
            {data.pages.map((page) =>
              page.Media.staff.edges.map((m) => (
                <Member key={m.id} member={m} />
              ))
            )}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}

Staff.defaultProps = {
  type: "ANIME",
};

export default Staff;
