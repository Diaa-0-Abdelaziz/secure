export const TableConfiguration = {
  data(){
    return {
      columns: [

        {
          prop: "locales",
          label: "Name",
          sortable: true
        },
        {
          prop: "start",
          label: "Start",
          sortable: true
        },
        {
          prop: "end",
          label: "End",
          sortable: true
        },
        {
          prop: "user_id",
          label: "User ID"
        },
        {
          prop: "created_at",
          label: "Created at"
        },
        {
          fixed: "right",
          label: "Operations"
        }
      ],
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 25, 50],
        total: 0
      },
      propsToSearch: ['name'],
      searchQuery: '',
    }
  },
}
