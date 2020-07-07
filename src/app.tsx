export function patchRoutes({ routes }) {
  routes[0].routes.unshift({
    component: require('@/pages/404.tsx').default,
  });
}
