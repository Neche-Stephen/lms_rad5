export const sidebarItems = [
    {
      name : 'Analytics',
      clicked : true,
      disabled : false,
      children : false,
      link : '/admin/analytics'
    },
    {
      name : 'Courses',
      link : '/admin/analytics',
      clicked : false,
      disabled : false,
      hasChildren : true,
      children : [
        {
          childName : 'Add Course',
          childLink : '',
          childClicked : false,
          disabled : false
        },
        {
          childName : 'View Courses',
          childLink : '',
          childClicked : false,
          disabled : false
        },
        {
          childName : 'Remove Course',
          childLink : '',
          childClicked : false,
          disabled : false
        }
      ],
    },
    {
      name : 'Newsletter',
      clicked : false,
      disabled : false
    },
    {
      name : 'Tutors',
      clicked : false,
      disabled : false
    },
    {
      name : 'Forums',
      clicked : false,
      disabled : false
    },
    {
      name : 'Certification',
      clicked : false,
      disabled : false
    },
    {
      name : 'Mail',
      clicked : false,
      disabled : false
    },
    {
      name : 'Notification',
      clicked : false,
      disabled : false
    },
    {
      name : 'Approvals',
      clicked : false,
      disabled : false
    },
    {
      name : 'Reports',
      clicked : false,
      disabled : false
    },
    {
      name : 'Settings',
      clicked : false,
      disabled : false
    },
    {
      name : 'Sign Out',
      clicked : false,
      disabled : false
    },
  
  
  ]