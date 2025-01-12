export const TableConfiguration = {
  data(){
    return {
      columns: [
        {
          prop: "locales",
          label: "Table Name",
          sortable: true
        },
        {
          prop: "branch_id",
          label: "Branch"
        },
        {
          prop: "floor_id",
          label: "Floor"
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
