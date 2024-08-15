/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  defaultSidebar: [
    { 
      type: 'autogenerated',
      dirName: '.',
    },
  ],
  photoniqSidebar: [
    {
      type: 'doc',
      id: 'photoniq/index',
      label: 'Overview',
    },
    { type: 'autogenerated', dirName: 'photoniq' }, // Autogenerate everything under 'photoniq'
  ],
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'tutorials/index',
      label: 'Build with Macrometa',
    },
    
      { type: 'autogenerated', dirName: 'tutorials' }
    ],



  // dataSidebar: [
  //   { type: 'autogenerated', dirName: 'data' }
  // ],
  // devToolsSidebar: [
  //   'development',
  //   {
  //     type: 'category',
  //     label: 'CLI',
  //     items: [
  //       { type: 'autogenerated', dirName: 'cli' },
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'SDKs',
  //     items: [
  //       { type: 'autogenerated', dirName: 'sdks' }
  //     ],
  //   },
  // ],
  // releaseNotesSidebar: [
  //   { type: 'autogenerated', dirName: 'release-notes' }
  // ],
  // sampleAppsSidebar: [
  //   { type: 'autogenerated', dirName: 'apps' }
  // ],
};

module.exports = sidebars;
