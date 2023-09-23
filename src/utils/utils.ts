export interface IgetPaginate {
  page?: any;
  limmit: any;
  sortBy?: string;
  order?: string;
  totalItems?: any;
}

export const getPaginate = ({ page, limmit, sortBy, order }: IgetPaginate) => {
  const nextPageUrl = `/api/post?page=${parseInt(page) + 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
  const prevPageUrl = `/api/post?page=${parseInt(page) - 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
  return { nextPageUrl, prevPageUrl };
};

export const getOffset = ({ page, limmit }: IgetPaginate) => {
  const offset = (parseInt(page) - 1) * parseInt(limmit);
  return { offset };
};

export const getPages = ({ totalItems, limmit }: IgetPaginate) => {
  const pages = Math.ceil(totalItems / limmit) !== 0 ? Math.ceil(totalItems / limmit) : 1;
  return { pages };
};

export const getInfo = ({ page, limmit, totalItems, sortBy, order }: IgetPaginate) => {
  const { nextPageUrl, prevPageUrl } = getPaginate({ page, limmit, sortBy, order });
  const { pages } = getPages({ totalItems, limmit });
  return {
    page: parseInt(page),
    count: totalItems,
    next: page < pages ? nextPageUrl : null,
    prev: page > 1 ? prevPageUrl : null,
    pages,
  };
};
