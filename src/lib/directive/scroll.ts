// 方定義は後で見ておこう
// custome directiveを入れたところにそれぞれscrollイベントを持たせることができる
import { DirectiveBinding } from "vue";

export const scrollDirective = function (
  el: HTMLElement,
  binding: DirectiveBinding
): void {
  const f = function (event: any) {
    if (binding.value(event, el)) {
      window.removeEventListener("scroll", f);
    }
  };
  window.addEventListener("scroll", f);
};
