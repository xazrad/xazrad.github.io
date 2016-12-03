webix.ready ->
  webix.ui
    rows: [
      {
        view: 'template'
        type: 'header'
        template: 'My App!'
      }
      {
        view: 'datatable'
        autoConfig: true
        editable: true
        data:
          title: 'My Fair Lady'
          year: 1964
          votes: 533848
          rating: 8.9
          rank: 5
      }
    ]