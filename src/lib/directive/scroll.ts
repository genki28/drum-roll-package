// 方定義は後で見ておこう
// custome directiveを入れたところにそれぞれscrollイベントを持たせることができる
import Vue, { DirectiveBinding } from "vue";
// export const scroll = (el: HTMLElement, binding: DirectiveBinding, vnode) => {
//   let f = function (evt) {
//     if (binding.value(evt, el)) {
//       window.removeEventListener("scroll", f)
//     }
//   }
//   window.addEventListener("scroll", f)
// }

export const scrollDirective = function(el: HTMLElement, binding: DirectiveBinding) {
    const f = function (evt: any) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f)
      }
    }
    window.addEventListener("scroll", f)
}
