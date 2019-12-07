<!--
- HappyFace node
-
- To be used within '<svg>' block.
-
- References:
-   - based on https://eugenkiss.github.io/7guis/tasks#circle - discovered via Svelte Examples
-->

<!-- Once-for-all initializer - we need an 'SVGPoint' for coordinate transforms.
-
- Note: SVG 2 may offer other means for this. Check 'DOMPoint' at some point.
-->
<script context="module">
  let svgPoint = null;     // SVGPoint for all instances; injected in a parent 'svg' or 'g' at first use
</script>

<script>
  // #later
  //import { evToSvgPointGen } from './conv.js';

  let selected;           // selected circle object, or 'null'

  // tbd. clicking on the face would create freckles (unless a freckle already is there)
  //let freckles = [];

  //... tbd. make eventToSvgCoord function here

  let thisG;    // particular SVG element

  $: active = false;  // thisG.hasClass("active");    // tbd.

  // Properties
  export let cx;
  export let cy;
  export let diam;
  export let active;    // bool; am I the active face?  (smiley and more details)

  //#later
  //export let mood = "happy";    // "happy"|"nah"|"sad"

  if (!svgPoint) {
    svgPoint = undefined;   // tbd. create one next to 'thisG'
  }

  function handleClick(ev) {
    console.log(`Face ev: ${ev}`);
    // tbd.
  }

</script>

<style>
  circle {
    stroke: black;
  }

  g.active {
    fill: #fed;
    strokeWidth: 2px
  }
</style>

<!-- SVG -->

<g
  bind:this={thisG}
  class:active={active}
>
  <circle cx={cx} cy={cy} r={diam/2}
          on:click="{ev => handleClick(ev)}"
          fill="{active ? 'red': 'white'}"
  />
</g>

<!-- tbd. Can we get 'fill' visuals from the styling part? Maybe not.
-->
