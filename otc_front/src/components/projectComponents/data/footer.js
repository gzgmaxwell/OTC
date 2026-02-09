export const configForm = [
  {
    label: "",
    prop: "messageContent",
    type: "textarea",
    span: 24,
    maxlength: 250,
    placeholder: "请输入...",
    showLimit: true,
  },
  {
    label: "",
    prop: "phone",
    type: "text",
    span: 24,
    maxlength: 11,
    placeholder: "请输入电话号码（必填）",
    showLimit: false,
  },
  {
    label: '',
    type: 'slotName',
    span: 24,
    slotName: 'button'
  }
];
