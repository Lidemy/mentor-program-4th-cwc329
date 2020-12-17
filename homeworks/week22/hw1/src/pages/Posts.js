import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'
import { useQuery } from '../utils';
import PostsList from '../components/PostsList';
import SinglePost from '../components/SinglePost'

export default function Posts() {
  const { path } = useRouteMatch();
  const query = useQuery();
  
  return (
    <Switch>
      <Route exact path={path}>
        <PostsList page={Number(query.get('page')) || 1} />
      </Route>
      <Route path={`${path}/:id`}>
        <SinglePost />
      </Route>
    </Switch>
  )
}
