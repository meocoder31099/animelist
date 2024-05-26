// Import Types
import type { SvelteComponent } from "svelte";

const instances: any = {};

const onkeepAlive = (
  node: HTMLElement,
  {
    id,
    componentClass,
    props,
  }: {
    id: string;
    componentClass: typeof SvelteComponent<any>;
    props: Record<string, any>;
  }
) => {
  if (instances[id]) {
    node.appendChild(instances[id]);
  } else {
    const wrapper = document.createElement("div");

    const instance = new componentClass({
      target: wrapper,
      props,
    });

    // console.log(instance);

    instances[id] = wrapper;

    node.appendChild(wrapper);
  }
};

export default onkeepAlive;
