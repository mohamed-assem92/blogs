import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Empty from 'antd/es/empty';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Spin from 'antd/es/spin';
import Image from 'antd/es/image';
import Typography from 'antd/es/typography';
import Pagination from 'antd/es/pagination';
import notification from 'antd/es/notification';
import { blogsAPI } from '../../api/blogs';
import { commentsAPI } from '../../api/comments';
import Commenter from './Commenter';
import CommentsList from './CommentsList';

const { Title } = Typography;

const Blog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [APIPaginator, setAPIPaginator] = useState({
    limit: 5,
    offset: 0,
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setCommentSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isErrorToLoadComments, setIsErrorToLoadComments] = useState(false);
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

  const handleAddNewComment = async (values) => {
    setCommentSubmitting(true);
    try {
      const newComment = await commentsAPI.create({
        blogId,
        authorName: values.userName,
        body: values.userComment,
      });
      setCommentsData([...commentsData, newComment.data]);
      notification.success({
        message: "Your Comment Submitted Successfully",
      });
    } catch (error) {
      notification.error({
        message: "Failed to Submitt Comment",
      });
    } finally {
      setCommentSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const blogs = await blogsAPI.getById(blogId);
        setBlogData(blogs.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [blogId]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingComments(true);
        const comments = await commentsAPI.getCommentsById({
          blogId,
          limit: APIPaginator.limit,
          offset: APIPaginator.offset,
        });
        setCommentsData(comments.data.docs);
        setPagination({
          ...pagination,
          total: comments.data.totalDocs,
        });
      } catch (err) {
        setIsErrorToLoadComments(true);
      } finally {
        setIsLoadingComments(false);
      }
    })();
  }, [blogId, APIPaginator]);

  return (
    <>
      {isError && <Empty />}
      {!isError && isLoading && <Spin style={{ marginLeft: '45rem', marginTop: '15rem' }} tip="Loading..." /> }
      {!isError && !isLoading && (
      <>
        <Title style={{ textAlign: 'center' }}>{blogData.title}</Title>
        <Row>
          <Col style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
              preview={false}
              src={blogData.mainImageURL}
              width="100%"
              height={400}
              fallback="data:image/png;base64,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"
            />
          </Col>
        </Row>
        <Title level={4} type="secondary" style={{ textAlign: 'center' }}>
          By:
          {` ${blogData.authorName}`}
        </Title>

        <Title level={4} strong style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
          {blogData.body}
        </Title>

        {isErrorToLoadComments && <Empty description={<>Error Loading Comments!</>} />}
        {!isErrorToLoadComments && isLoadingComments && <Spin style={{ marginLeft: '45rem', marginTop: '5rem' }} tip="Loading Comments..." /> }
        {!isErrorToLoadComments && !isLoadingComments && (
        <>
          <CommentsList comments={commentsData} />
          <Commenter
            submitting={submitting}
            handleSubmitt={handleAddNewComment}
          />
          <Row>
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
          </Row>
        </>
        )}
      </>
      )}
    </>
  );
};

export default Blog;
