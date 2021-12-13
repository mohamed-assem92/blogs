import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Empty from 'antd/es/empty';
import Card from 'antd/es/card';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Pagination from 'antd/es/pagination';
import { blogsAPI } from '../../api/blogs';
import CardSkeleton from './CardSkeleton';

const { Meta } = Card;

const Blogs = () => {
  const history = useHistory();
  const [blogsData, setBlogsData] = useState([]);
  const [APIPaginator, setAPIPaginator] = useState({
    limit: 5,
    offset: 0,
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const handlePagination = (page, pageSize) => {
    setAPIPaginator({
      ...APIPaginator,
      limit: pageSize,
      offset: (page - 1) < 0 ? 0 : (page - 1) * pageSize,
    });
    setPagination({
      ...pagination,
      current: page,
    });
  };

  const handleCardClick = (blogId) => {
    history.push(`/blogs/${blogId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const blogs = await blogsAPI.getAll({
          limit: APIPaginator.limit,
          offset: APIPaginator.offset,
        });
        setBlogsData(blogs.data.docs);
        setPagination({
          ...pagination,
          total: blogs.data.totalDocs,
        });
      } catch (err) {
        // 'Failed to fetch data from server'
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [APIPaginator]);

  return (
    <>
      {isError && <Empty />}
      {!isError && isLoading && <CardSkeleton /> }
      {!isError && !isLoading && (
      <>
        <Row gutter={[48, 48]} style={{ marginTop: '9rem' }}>
          <Col span={2} />
          {blogsData.map((blog) => (
            <Col xs={24} xl={4} key={blog.id}>
              <Card
                onClick={() => { handleCardClick(blog.id); }}
                hoverable
                style={{ width: 250 }}
                cover={<img alt="blog" src={blog.mainImageURL} style={{ height: 250 }} />}
              >
                <Meta title={blog.title} description={blog.authorName} />
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          style={{ float: 'right', marginTop: '5rem', marginRight: '5.4rem' }}
          total={pagination.total}
          responsive
          defaultPageSize={5}
          defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={handlePagination}
          current={pagination.current}
        />
      </>
      )}
    </>
  );
};

export default Blogs;
