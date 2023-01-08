export interface IgetPaginate {
  page?: any;
  limmit?: any;
  sortBy?: string;
  order?: string;
  totalPosts?: any;
}

export const getPaginate = ({ page, limmit, sortBy, order }: IgetPaginate) => {
  const nextPageUrl = `/api/post?page=${Math.floor(page) + 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
  const prevPageUrl = `/api/post?page=${Math.floor(page) - 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
  return { nextPageUrl, prevPageUrl };
};

export const getOffset = ({ page, limmit }: IgetPaginate) => {
  const offset = (Math.floor(page) - 1) * Math.floor(limmit);
  return { offset };
};

export const getPages = ({ totalPosts, limmit }: IgetPaginate) => {
  const pages = Math.ceil(totalPosts[0][0].total / limmit) !== 0 ? Math.ceil(totalPosts[0][0].total / limmit) : 1;
  return { pages };
};

export const getInfo = ({ page, limmit, totalPosts, sortBy, order }: IgetPaginate) => {
  const { nextPageUrl, prevPageUrl } = getPaginate({ page, limmit, sortBy, order });
  const { pages } = getPages({ totalPosts, limmit });
  return {
    page: Math.floor(page),
    count: totalPosts[0][0].total,
    next: page < pages ? nextPageUrl : null,
    prev: page > 1 ? prevPageUrl : null,
    pages,
  };
};
