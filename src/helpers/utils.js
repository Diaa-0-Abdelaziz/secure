export const presentApiErrorMessage = (component, error) => {
  const {response} = error;
  if (response) {
    const {request, ...errorObject} = response; // take everything but 'request'
    for (const [key, value] of Object.entries(errorObject.data.errors)) {
      component.$notify({title: value[0], type: 'danger'})
    }
  } else {
    console.log(error);
  }
}

export const submitAndNotify = async (context, action , callback) => {
  let loader = context.$loading.show();
  action.then((data) => {
    context.$notify({type: 'success', message: 'Added successfully'});
    context.$emit('onSubmit');
    callback();
    // context.$refs[formName].resetForm();
  })
  .catch((error) => {
    context.$error(error.message)
  })
  .finally(() => loader.hide())
}
