// Import Types
import type { Maybe } from "@/types";
import type { SvelteComponent } from "svelte";

// Import Libs
import { onMount, tick } from "svelte";

const useCreateComponent = ({
  componentClass,
  target,
  anchor,
  props,
  context,
}: {
  componentClass: typeof SvelteComponent<any> | Promise<typeof SvelteComponent<any>>;
  target: string | Element | Document | ShadowRoot;
  anchor?: string | Element;
  props: Record<string, any>;
  context?: Map<any, any>;
}): void => {
  onMount(async () => {
    await tick();
    let component: SvelteComponent | undefined;
    // Check if the value of target exists or not?
    // If don't exit early.
    let targetNode: Maybe<Element | Document | ShadowRoot> = !(
      target instanceof Element ||
      target instanceof Document ||
      target instanceof ShadowRoot
    )
      ? document.querySelector(target)
      : target;
    if (!targetNode) return;
    // Check if the value of anchor exists or not?
    let anchorNode: Element | undefined = undefined;
    if (!!anchor)
      anchorNode = !(anchor instanceof Element)
        ? document.querySelector(anchor) ?? undefined
        : anchor;

    // Check the type of the componentClass argument and initialize the component.
    if (componentClass instanceof Promise) {
      // Kiểu componentClass là Promise<typeof SvelteComponent>
      try {
        const componentClassModule = await componentClass;
        component = new componentClassModule({
          target: targetNode,
          anchor: anchorNode,
          props,
          context,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Kiểu componentClass là typeof SvelteComponent
      component = new componentClass({
        target: targetNode,
        anchor: anchorNode,
        props,
        context,
      });
    }
    return () => {
      component?.$destroy();
      component = undefined;
    };
  });
};

export default useCreateComponent;
