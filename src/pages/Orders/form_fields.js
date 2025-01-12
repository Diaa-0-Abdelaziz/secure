
export const models = {
  status:null,
}
export const options = {
  statusOptions:[]
}

export const fields = [
  {
    label:'Order Status',
    name:'status',
    placeholder:'Select status',
    type:'select',
    value:'',
    validation_messages:{
      required: 'This field is required'
    }
  }
];
