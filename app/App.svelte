<script>
  // Use this for npm-published module
  //import HappyFace from 'svelte-happy-demo';

  // Use this for local developed code
  import HappyFace from '../src/index.svelte';

  import { evToSvgPointGen } from '../src/conv.js';

  let i = 0;              // position to undo to in 'undoStack' +1 (0: nothing to undo)
  let undoStack = [[]];   // clones of 'faces'

  let faces = [];       // { cx: num, cy: num, diam: num }

  let activeFace = null;    // Last clicked face (changes appearance and maybe even detail level)

  let thisEl;    // particular SVG element

  const evToSvgPoint = evToSvgPointGen(thisEl);   // tbd. maybe needs to be in 'onMount'

  /*
  * Click on the SVG
  *
  * Create a new face at the clicked coords
  */
  function handleClick(ev) {
    const p = evToSvgPoint(ev);
    const tmp = { cx: p.x, cy: p.y, diam: 50 };

    faces = faces.concat(tmp);   // Svelte note: so changes are acted upon
    activeFace = tmp;

    pushState();
  }

  // Note: This undo/redo is very basic, in that it stores the whole application state (instead of a diff between states)
  //
  function pushState() {
    const tmp = undoStack.slice(0, ++i);    // lose old future if there was any
    tmp.push(cloneState(faces));
    undoStack = tmp;
  }

  function stepState(step) {   // step: -1 or +1
    faces = cloneState(undoStack[i += step]);
  }

  // tbd. cloning may not be required?
  function cloneState(faces_) {
    return faces_.map(({ cx, cy, diam }) => ({ cx, cy, diam }));
  }
</script>

<style>
  svg {
    background-color: #eee;
    width: 100%;
    height: 300px;
  }

  div#controls {
    position: absolute;
    width: 100%;
    text-align: center;
  }
</style>

<!-- HTML -->

<h1>Svelte Happy Demo</h1>

<div id="controls">
  Undo stack length: {undoStack.length}
  <button on:click="{() => stepState(-1)}" disabled="{i === 0}">undo</button>
  <button on:click="{() => stepState(+1)}" disabled="{i === undoStack.length -1}">redo</button>
</div>

<svg on:click={(ev) => console.log(ev) }
     bind:this={thisEl}
>
  {#each faces as o}
    <HappyFace cx={o.cx} cy={o.cy} diam={o.diam} active={o === activeFace}
    />
  {/each}
</svg>
