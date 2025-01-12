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
          prop: "business_id",
          label: "Business ID"
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