export function patchRoutes({ routes }) {
  routes[0].routes.push({
    component: require('@/pages/404.tsx').default,
  });
}
