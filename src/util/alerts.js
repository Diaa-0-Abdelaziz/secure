import { Notification } from 'element-ui';
const Alerts = {
  install (Vue , vue) {
    Vue.prototype.$success = (title, msg)=> {
      return vue.$swal.fire({
        title: title || 'Done Successfully',
        text: msg || null,
        icon: 'success'
      })
    };
    Vue.prototype.$error = (title, msg)=> {
      return vue.$swal.fire({
        title: title || 'Error',
        text: msg || null,
        icon: 'error'
      })
    };
    Vue.prototype.$confirm = (title, msg)=> {
      return vue.$swal.fire({
        title: title || 'Are you sure?',
        text: msg || "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
    };
    Vue.prototype.$notify = (options)=> {
      if(!options.type)
        options.type = 'success'
      Notification(options)
    };

  }
}
export default Alerts;
