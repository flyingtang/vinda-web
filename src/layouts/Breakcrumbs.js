import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';


const routes = [
  { path: '/', breadcrumb: 'home' },
  { path: '/login', breadcrumb: 'login' },
  { path: '/admin/articles', breadcrumb: 'articles' },
  { path: '/admin/articles/new', breadcrumb: 'new' },
  { path: '/admin/articles/:id', breadcrumb: 'edit' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
  </div>
));