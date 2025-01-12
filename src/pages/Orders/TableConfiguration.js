export const TableConfiguration = {
  data(){
    return {
      columns: [
        {
          prop: "id",
          label: "Id",
          width: 50
        },
        {
          prop: "status",
          label: "Status"
        },
        {
          prop: "order_note",
          label: "Order Notes",
          width: 150
        },
        {
          prop: "order_lines",
          label: "Order Details",
          width: 400
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
