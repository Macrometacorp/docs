const subnavs = {
  'docs': {
    includeBasePaths: [
      '/'
    ],
    excludeBasePaths: [
      `/api`,
    ],
    items: [
      { href: '/', label: 'Home', position: 'left' },
      { href: '/data', label: 'Data', position: 'left' },
      { href: '/compute', label: 'Compute', position: 'left' },
      { href: '/access', label: 'Access', position: 'left' },
      { href: '/network', label: 'Network', position: 'left' },
      { href: '/development', label: 'Developer Tools', position: 'left' },
      { href: '/apps', label: 'Sample Apps', position: 'right' },
      { href: '/release-notes', label: 'Release Notes', position: 'right' },
    ]
  },
};

module.exports = subnavs;
