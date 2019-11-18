import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Grid
} from '@material-ui/core';
import isEmpty from 'is-empty';
import Title from '../../components/template/titleComponent'
import BookCard from '../../components/collection/book/bookCard';
import ArticleCard from '../../components/collection/article/articleCard';
import VideoCard from '../../components/collection/video/videoCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserContributions } from '../../actions/userActions';

function UserContributions(props) {
  useEffect(() => props.getUserContributions(props.user._id), [props.user._id]);

  return (
    <>
      <Title title={`${props.user.name} - Contribuições`} />
      <Grid container spacing={2}>
        {props.contributions && !isEmpty(props.contributions) ? (
          props.contributions.map(item => (
            <Grid item xs={12} sm={8} md={6} lg={4}>
              {item.type === 'book' && <BookCard book={item} />}

              {item.type === 'article' && <ArticleCard article={item} />}

              {item.type === 'video' && <VideoCard video={item} />}
            </Grid>
          ))
        ) : (
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>Esse usuário não colaborou com nenhum item.</Box>
              </Paper>
            </Grid>
          )}
      </Grid>
    </>
  );
}

const mapStateToProps = state => ({
  contributions: state.users.user.contributions
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserContributions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContributions);