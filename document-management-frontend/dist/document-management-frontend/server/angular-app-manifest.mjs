
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/upload"
  },
  {
    "renderMode": 2,
    "route": "/verify"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 29055, hash: '807fcfdd75275a26b96338e5920a738396174d3a74ec9dda56e65fdc40401450', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22648, hash: '0fa9f1266562a837358fec1cd9357d698a2180ac0a774b8e9e84e19a9251dbb4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'upload/index.html': {size: 35993, hash: 'bfd40f2b0d6f859f34556b4b8cc1825f150f07cb93d6a9d7447211e1c8c21322', text: () => import('./assets-chunks/upload_index_html.mjs').then(m => m.default)},
    'verify/index.html': {size: 35257, hash: '4dac186f952fa29800950796748672d66aae5f765352060526f5b562fdede9ce', text: () => import('./assets-chunks/verify_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 39687, hash: '713d0a4a739c4f9791a71f09bda03d3e153ee9ac1d015f6e0e995f9c396839c7', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-6H2TKIS5.css': {size: 6960, hash: 'qvV4AWI8qVw', text: () => import('./assets-chunks/styles-6H2TKIS5_css.mjs').then(m => m.default)}
  },
};
