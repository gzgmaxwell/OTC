import ElButton from "element-ui/lib/button";
export default {
  name: "JaButton",
  extends: ElButton,
  props: {
    click: Function
  },
  data() {
    return {
      load: false
    };
  },
  methods: {
    onClick() {
      if (this.click) {
        this.load = true;
        Promise.resolve(this.click()).then(
          () => {
            this.load = false;
          },
          () => {
            this.load = false;
          }
        );
      }
    }
  },
  render() {
    return (
      <button
        type={this.nativeType}
        autofocus={this.autofocus}
        class={[
          "el-button",
          this.type ? "el-button--" + this.type : "",
          this.size ? "el-button--" + this.size : "",
          {
            "is-disabled": this.buttonDisabled,
            "is-loading": this._loading || this.load,
            "is-plain": this.plain,
            "is-round": this.round,
            "is-circle": this.circle
          }
        ]}
        on-click={this.onClick}
      >
        {(this.loading || this.load) && <i class="el-icon-loading"></i>}
        {this.icon && !this.loading && !this.load && <i class={this.icon}></i>}
        {this.$slots.default}
      </button>
    );
  }
};
